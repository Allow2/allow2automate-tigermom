// Copyright [2021] [Allow2 Pty Ltd]
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

'use strict';
import TabContent from './Components/TabContent';

function plugin(context) {

    var plugin = {
        transientData: 'some transient value'
    };

    //
    // onLoad (optional): called on the main process when this plugin is loaded
    //
    // plugin.onLoad = function() {
    //     // nop
    // };

    //
    // onSetEnabled (optional): called by the electron main process when this plugin is enabled/disabled
    //
    // plugin.onSetEnabled = function(enabled) {
    //     // nop
    // };

    //
    // onUnload (optional): called if the user is (removing) deleting the plugin, use this to clean up before the plugin disappears
    //
    // plugin.onUnload = function(callback) {
    //     // nop
    //     callback(null);
    // };

    return plugin;
}

module.exports = {
    plugin,
    TabContent
};
