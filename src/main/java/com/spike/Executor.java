package com.spike;

import com.spike.cli.CliCreator;
import com.spike.imports.NewImportCompiler;
import com.spike.transpiler.ScriptsCompiler;
import com.spike.transpiler.ScriptsIO;
import com.spike.templates.TemplateCompiler;
import com.spike.templates.TemplatesIO;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Dawid on 2017-01-29.
 */
public class Executor {

    static Boolean DEBUG = false;

    static CliCreator cliCreator = new CliCreator();

    static ScriptsIO scriptsIO = new ScriptsIO();
    static TemplatesIO templatesIO = new TemplatesIO();

    static ScriptsCompiler scriptsCompiler = new ScriptsCompiler();
    static TemplateCompiler templatesCompiler = new TemplateCompiler();
    static NewImportCompiler importsCompiler = new NewImportCompiler();

    public static void main(String[] args) throws Exception {

        String type = args[0];

        if (type.equals("test-templates")) {
            type = "templates";
            args = new String[]{null, "templates_input/watch", "templates_output/templates.js", "templates_output/watchers.js", "new", "PROJECT:GOOGLE,ENV:PROD"};
            //args = new String[]{null, "templates_input/plain", "templates_output/templates.js", "none", "old", "PROJECT:GOOGLE,ENV:PROD"};
        } else if (type.equals("test-transpiler")) {
            type = "transpiler";
            args = new String[]{null, "scripts_input/spike-framework.spike", "scripts_output/compiled.js", "spike", "PROJECT:DEMO,ENV:PROD"};
        } else if (type.equals("test-cli")) {

            args = new String[]{"cli", "cli/test", "app.model.response.PersonalData", "class"};
            cli(args);
            args = new String[]{"cli", "cli/test", "app.service.Auth", "static-class"};
            cli(args);
            args = new String[]{"cli", "cli/test", "app.controller.home.Home", "controller", "css"};
            cli(args);
            args = new String[]{"cli", "cli/test", "app.enums.api.Session", "enum"};
            cli(args);
        }


        if (type.equals("transpiler")) {

            if(args.length == 4){
                ScriptsCompiler.SPIKE_COMPILATION = true;
            }

            if(args.length > 4){

                String[] params = args[4].split(",");

                for(String param : params){

                    String[] split = param.split(":");
                    if(split[0].equals("PROJECT")){
                        TemplateCompiler.PROJECT = split[1];
                    }

                    if(split[0].equals("ENV")){
                        TemplateCompiler.ENV = split[1];
                    }

                }

            }

            //String fileBody = importsCompiler.compileImports(new File(args[1]), false);
            String fileBody = scriptsCompiler.compileSyntax(scriptsIO.getFileContentBuffered(new File(args[1])));

            scriptsIO.saveFile(fileBody, args[2]);

        } else if (type.equals("templates")) {

            TemplateCompiler.MESSAGES_CLASS = "spike.core.Message.get";

            if(args.length > 4){

                if(args[4].equals("old")) {
                    TemplateCompiler.OLD_VERSION = true;
                    TemplateCompiler.MESSAGES_CLASS = "app.message.get";
                }

            }

            if(args.length == 6){

                String[] params = args[5].split(",");

                for(String param : params){

                    String[] split = param.split(":");
                    if(split[0].equals("PROJECT")){
                        TemplateCompiler.PROJECT = split[1];
                    }

                    if(split[0].equals("ENV")){
                        TemplateCompiler.ENV = split[1];
                    }

                }

            }

            List<File> files = TemplatesIO.getFileList(args[1]);
            List<String> functionBodies = new ArrayList<>();
            List<String> watchersBodies = new ArrayList<>();

            long start = System.currentTimeMillis();

            for (File file : files) {
                String[] templates = templatesCompiler.parseSpikeTemplate(file, args[1], importsCompiler.compileImports(file, false));
                functionBodies.add(templates[0]);
                watchersBodies.add(templates[1]);
            }

            Console.log("Templates takes: " + (System.currentTimeMillis() - start) + "ms");

            templatesIO.saveConcatedFiles(functionBodies, args[2]);

            if(!TemplateCompiler.OLD_VERSION){
                templatesIO.saveConcatedFiles(watchersBodies, args[3]);
            }


        } else if (type.equals("cli")) {
            cli(args);
        }

    }

    /**
     * For plain class:
     * java -jar spike-transpiler.jar cli src app.model.response.PersonalData class
     *
     * For static class:
     * java -jar spike-transpiler.jar cli src app.service.Auth static-class
     *
     * For module:
     * java -jar spike-transpiler.jar cli src app.controller.home.Home controller css
     *
     * @param args
     * @throws IOException
     */
    static void cli(String[] args) throws IOException {

        String rootPath = args[1];
        String moduleFullClassName = args[2];
        String moduleType = args[3];
        String preprocessor = null;

        if(args.length == 5){
            preprocessor = args[4];
        }

        cliCreator.createModule(rootPath, moduleFullClassName, moduleType, preprocessor);


    }

}
