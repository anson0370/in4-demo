(function() {
  if (!this.require) {
    var modules = {}, cache = {};

    var require = function(name, root) {
      var path = expand(root, name), indexPath = expand(path, './index'), module, fn;
      module   = cache[path] || cache[indexPath];
      if (module) {
        return module;
      } else if (fn = modules[path] || modules[path = indexPath]) {
        module = {id: path, exports: {}};
        cache[path] = module.exports;
        fn(module.exports, function(name) {
          return require(name, dirname(path));
        }, module);
        return cache[path] = module.exports;
      } else {
        throw 'module ' + name + ' not found';
      }
    };

    var expand = function(root, name) {
      var results = [], parts, part;
      // If path is relative
      if (/^\.\.?(\/|$)/.test(name)) {
        parts = [root, name].join('/').split('/');
      } else {
        parts = name.split('/');
      }
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part == '..') {
          results.pop();
        } else if (part != '.' && part != '') {
          results.push(part);
        }
      }
      return results.join('/');
    };

    var dirname = function(path) {
      return path.split('/').slice(0, -1).join('/');
    };

    this.require = function(name) {
      return require(name, '');
    };

    this.require.define = function(bundle) {
      for (var key in bundle) {
        modules[key] = bundle[key];
      }
    };

    this.require.modules = modules;
    this.require.cache   = cache;
  }

  return this.require;
}).call(this);this.require.define({"app":function(exports, require, module){(function() {
  var importantThings, userProfile;

  importantThings = function() {
    if ($(".important-things").length === 0) {
      return;
    }
    return setInterval(function() {
      var $fadeInThing, $fadeOutThing, $things;
      $things = $(".important-things .thing");
      $fadeOutThing = $($things[1]);
      $fadeInThing = $($things[0]);
      $fadeOutThing.addClass("fade-out");
      return setTimeout(function() {
        $fadeInThing.insertAfter($fadeOutThing);
        return $fadeOutThing.removeClass("fade-out");
      }, 1200);
    }, 5000);
  };

  userProfile = function() {
    $(".js-open-profile").click(function() {
      $(".user-profile").show();
      return false;
    });
    return $(".js-close-profile").click(function() {
      $(".user-profile").hide();
      return false;
    });
  };

  module.exports = function() {
    console.info("log from app!");
    importantThings();
    return userProfile();
  };

}).call(this);
;}});
