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

    static void debug(Object data) {

        if (DEBUG) {
            System.out.println(data);
        }

    }

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
           // args = new String[]{null, "templates_input/plain", "templates_output/templates.js", "templates_output/watchers.js"};
            args = new String[]{null, "templates_input/plain", "templates_output/templates.js", "none", "old", "PROJECT:GOOGLE,ENV:PROD"};
        } else if (type.equals("test-transpiler")) {
            type = "transpiler";
            args = new String[]{null, "scripts_input/spike-framework.spike", "scripts_output/compiled.js", "spike"};
        } else if (type.equals("test-cli")) {
            args = new String[]{"cli", "cli/test/component/", "component", "UserPanel"};
            cli(args);
            args = new String[]{"cli", "cli/test/controller/", "controller", "Home"};
            cli(args);
            args = new String[]{"cli", "cli/test/modal/", "modal", "Message"};
            cli(args);
            args = new String[]{"cli", "cli/test/partial/", "partial", "LoginForm"};
            cli(args);
            args = new String[]{"cli", "cli/test/service/", "service", "Auth"};
            cli(args);
            args = new String[]{"cli", "cli/test/util", "util", "Utils"};
            cli(args);
        }


        if (type.equals("transpiler")) {

            if(args.length == 4){
                ScriptsCompiler.SPIKE_COMPILATION = true;
            }

            //String fileBody = importsCompiler.compileImports(new File(args[1]), false);
            String fileBody = scriptsCompiler.compileSyntax(scriptsIO.getFileContentBuffered(new File(args[1])));

            scriptsIO.saveFile(fileBody, args[2]);

        } else if (type.equals("templates")) {

            if(args.length > 4){

                if(args[4].equals("old")) {
                    TemplateCompiler.OLD_VERSION = true;
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

            for (File file : files) {
                String[] templates = templatesCompiler.parseSpikeTemplate(file, args[1], importsCompiler.compileImports(file, true));
                functionBodies.add(templates[0]);
                watchersBodies.add(templates[1]);
            }

            templatesIO.saveConcatedFiles(functionBodies, args[2]);

            if(!TemplateCompiler.OLD_VERSION){
                templatesIO.saveConcatedFiles(watchersBodies, args[3]);
            }


        } else if (type.equals("cli")) {
            cli(args);
        }

    }

    static void cli(String[] args) throws IOException {

        switch (args[2]) {
            case "component":
                cliCreator.createComponent(args[1], args[3]);
                break;
            case "partial":
                cliCreator.createPartial(args[1], args[3]);
                break;
            case "controller":
                cliCreator.createController(args[1], args[3]);
                break;
            case "modal":
                cliCreator.createModal(args[1], args[3]);
                break;
            case "service":
                cliCreator.createService(args[1], args[3]);
                break;
            case "util":
                cliCreator.createUtil(args[1], args[3]);
                break;
        }

    }

}
