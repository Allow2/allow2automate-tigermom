# plugin template project for Allow2Automate

Extend Allow2Automate with whatever functionality you like.

## how to publish a plugin

There are a few steps involved in setting up a new plugin and testing and publishing it.

1. first you need to understand how the plugins work and design and/or prototype your plugin
2. you can use this project as a basis for your plugin
3. once you get it compiling, you can manually insert it into the plugins directory for allow2automate
and start allow2automate. It will detect your plugin and load it as if it was loaded from the published plugins directory.
4. 

# Plugin structure

Allow2automate plugins have 2 components. Most plugins will require both as they intend to both
have a control interface and a service mechanism. Obviously then you need to be able to communicate
between the 2 processes and also persist state.

The standard use case would be for extending Allow2 control to a web service for example. In this case, the user
would install your plugin, this loads into the main electron process immediately, but with a blank default configuration.
You can set things up ready to go, but don't really have much to do yet.

Once the user switches to your tab, the Component side of the plugin is loaded and presented to allow them to alter their
configuration. Here you can present interfaces to allow them to remotely authenticate with the web service, set up rules and
assign children from their account.

When you persist those changes, they are fed to your Service Mechanism in the back end, and that's where you actually implement
the controls.

See the allow2automate-wemo, allow2automate-ssh and allow2automate-battle.net for examples on how to implement various control bridges.

## Control Interface

Each plugin must export a react component named "TabContent". This is the control interface that
loads into the allow2automate. This component is transient and is only used to configure the plugin
features and display status. It can achieve control in 2 ways. The main control it has is to change
persisted state upon which the service mechanism relies to enforce behaviour. You also can use IPC
to directly communicate with your Service Mechanism component, but this really should be used sparingly.

Be very aware that the component is transient, it is only loaded generally when the user actually
switches to your plugin tab, it also can be unloaded if they switch to a different tab or closes the
allow2automate window. For that reason, and because it is in the render process of the electron app,
it should not set up any persistent behaviours, timers, background processes or anything really other
than simple displaying status and providing interactive controls for users to configure your plugin.

All the control mechanism stuff needs to live in the Service Mechanism of your plugin, not here.

## Service Mechanism
 
Each plugin must export a function named "plugin" that takes a single argument, being a "context" object.
The context object will pass in several mechanisms and functions.

This is where you should set up your actual comms mechanisms. You listen to changes in state here, both
from the user changing configurations, and from Allow2 triggering events, such as telling you gaming time is now over
You can also tell allow2automate about usage in whatever mechanism you have linked and Allow2 will use this to
track usage.

You have a couple of optional built in callbacks you may implement to help you with managing the plugin lifecycle.

onLoad()
onSetEnabled(Boolean)
onUnload()

This part of the plugin is the engine room and pretty much resides permanently in memory after being loaded. You can spawn
long running processes (using callbacks - be aware this is still on the main electron process, so play nicely).
You can also set timers, do remote calls to web services/etc.

## state persistence

Both your Control Interface (React Component for tab content on the render process) and your Service Mechanism (on the main process)
have access to, get nbotified of changes to, and are able to send instructions to update the configuration state in the allow2automate
main store. This should really be your primary mechanism for communication as it serves to both communicate configurationsand also
persist them over restarts of the allow2automate app.

## inter-process communication (IPC)

Allow2automate provides a bi-directional ipc channel for all plugins, it is an element of the plugin component mechanism.
You also needn't worry about clashes as all ipc comms you initiate from either end is namespaced automatically, so you
shouldn't clash with anyone else.

# Cloning this project as a starting point

Start by cloning this project

```bash
git clone https://allow2automate-plugin
```

# Publishing

This project has a built in .github workflow to publish your plugin to npm (needed for installation by other users).
You only need to set one secret in your github repo being your "NPM_TOKEN", just generate one under your publishing account
on npm.org and set that token in your repo secrets in github. Then when you check in changes on your main branch (or merge
pull requests) and the package.json version number is updated, this workflow will auto-publish your plugin to npm under your account.

You can then simply type in the plugin name in any allow2automate instance to download and install your new plugin.

## plugin directory

(coming soon)

## plugin upgrades and notifications of new versions

(coming soon)