// import esbuild from 'esbuild';
const esbuild = require("esbuild");
const scripts = [
    { entry: "./public/javascripts/login.js", outfile: "./public/javascripts/loginBundle.js" },
    { entry: "./public/javascripts/signup.js", outfile: "./public/javascripts/signupBundle.js" },
    { entry: "./public/javascripts/operations.js", outfile: "./public/javascripts/operationsBundle.js" },
    { entry: "./public/javascripts/search.js", outfile: "./public/javascripts/searchBundle.js" },
    { entry: "./public/javascripts/club.js", outfile: "./public/javascripts/clubBundle.js" },
    { entry: "./public/javascripts/member.js", outfile: "./public/javascripts/memberBundle.js" },
    { entry: "./public/javascripts/profile.js", outfile: "./public/javascripts/profileBundle.js" },
    { entry: "./public/javascripts/trainer.js", outfile: "./public/javascripts/trainerBundle.js" },
    { entry: "./public/javascripts/fitnessLog.js", outfile: "./public/javascripts/fitnessLogBundle.js" },
];

scripts.forEach(script => {
    esbuild.build({
        platform: "browser",
        entryPoints: [script.entry],
        outfile: script.outfile,
        bundle: true,
        target: ["chrome60", "firefox60", "safari11", "edge20"],
        sourcemap: "inline",
    }).catch(() => process.exit(1));
});
