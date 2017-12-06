using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Com.Reactlibrary.RNSqLiteManager
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNSqLiteManagerModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNSqLiteManagerModule"/>.
        /// </summary>
        internal RNSqLiteManagerModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNSqLiteManager";
            }
        }
    }
}
