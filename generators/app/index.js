const Generator = require("yeoman-generator");

module.exports = class extends (
  Generator
) {
  prompting() {
    // 用户输入
    return this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname,
      },
    ]).then((params) => {
      this.params = params;
    });
  }
  writing() {
    const templates = [
      "build",
      "src",
      ".editorconfig",
      ".env.dev",
      ".env.prod",
      ".eslintrc.js",
      ".gitignore",
      ".npmrc",
      ".nuxtignore",
      ".prettierrc",
      ".stylelintrc",
      "jsconfig.json",
      "nuxt.config.js",
      "package.json",
      "README.md"
    ];
    templates.forEach((item) => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        this.params
      );
    });
  }
};
