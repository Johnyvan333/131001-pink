"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    clean: {
      build: ["build"],
        css: ["build/css/style.not-resorted.css"]
    },

    copy: {
      build: {
        files: [{
          expand: true,
          src: [
            "fonts/**/*.{woff, woff2}",
            "img/**",
            "js/**",
            "*.html"
          ],
          dest: "build"
        }]
      },

      html: {
        files: [{
          expand: true,
          src: ["*.html"],
          dest: "build"
        }]
      },

      js: {
        files: [{
          expand: true,
          src: ["js/**"],
          dest: "build"
        }]
      }
    },

    less: {
      style: {
        files: {
          "build/css/style.not-resorted.css": ["less/style.less"]
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers: [
            "last 1 version",
            "last 2 Chrome versions",
            "last 2 Firefox versions",
            "last 2 Opera versions",
            "last 2 Edge versions"
          ]}),
          require("css-mqpacker")({
            sort: true
          })
        ]
      },
      style: {
        src: "build/css/*.css"
      }
    },

    csscomb: {
        style: {
          options: {
             config: "csscomb.json",
          },
          files: {
            "build/css/style.css": ["build/css/style.not-resorted.css"],
          }
       },
    },

    csso: {
      style: {
        options: {
          report: "gzip"
        },
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png, jpg, gif}"]
        }]
      }
    },

    svgmin: {
      symbols: {
        files: [{
          expand: true,
          src: ["build/img/**/*.svg"]
        }]
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src: [
            "*.html",
            "css/*.css",
          ]
        },
        options: {
          server: "build",
          watchTask: true,
          notify: false,
          open: true,
          ui: false
        }
      }
    },

    watch: {
      html: {
        files: ["*.html"],
        tasks: ["copy:html"],
        options: {spawn: false}
      },
      js: {
        files: ["js/*.js"],
        tasks: ["copy:js"],
        options: {spawn: false}
      },
      style: {
        files: ["less/**/*.less"],
        tasks: ["less", "postcss", "csscomb", "clean:css", "csso"],
        options: {spawn: false}
      }
    }
  });

  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("build", [
    "clean",
    "copy",
    "less",    
    "postcss",
    "csscomb",
    "clean:css",
    "csso",
    "svgmin",
    "imagemin"
  ]);
};
