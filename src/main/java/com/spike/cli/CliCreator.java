package com.spike.cli;

import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;

/**
 * Created by Dawid on 2017-04-02.
 */
public class CliCreator {


    public static void createModule(String rootPath, String moduleFullClassName, String moduleType, String preprocessor) throws IOException {

        if(moduleType.equals("global-element")){
            moduleType = "globalElement";
        }else{
            moduleType = moduleType.toLowerCase();
        }

        String modulePackage = moduleFullClassName.substring(0, moduleFullClassName.lastIndexOf("."));
        String moduleName = moduleFullClassName.substring(moduleFullClassName.lastIndexOf(".") + 1, moduleFullClassName.length());
        String moduleNameFromLower = moduleName.substring(0, 1).toLowerCase() + moduleName.substring(1, moduleName.length());
        String moduleNameFromUpper = moduleName.substring(0, 1).toUpperCase() + moduleName.substring(1, moduleName.length());
        String moduleTypeFromUpper = moduleType.substring(0, 1).toUpperCase() + moduleType.substring(1, moduleType.length());
        String componentJS = "";

        if (moduleType.equals("enum")) {

            componentJS += "package " + modulePackage + ";\n\n";
            componentJS += "enum " + moduleName + " {\n\n";
            componentJS += "}";

        } else if (moduleType.equals("static-class")) {

            componentJS += "package " + modulePackage + ";\n\n";
            componentJS += "import Log from spike.core.Log;\n\n";
            componentJS += "static class " + moduleName + " {\n\n";
            componentJS += "}";

        } else if (moduleType.equals("class")) {

            componentJS += "package " + modulePackage + ";\n\n";
            componentJS += "import Log from spike.core.Log;\n\n";
            componentJS += "class " + moduleName + " {\n\n";
            componentJS += "    " + moduleName + ": function () {\n\n";
            componentJS += "    }\n\n";
            componentJS += "}";

        } else {

            moduleType = moduleType.substring(0, 1).toUpperCase() + moduleType.substring(1, moduleType.length());

            componentJS += "package " + modulePackage + ";\n\n";
            componentJS += "import " + moduleType + " from spike.core." + moduleType + ";\n";
            componentJS += "import Log from spike.core.Log;\n\n";
            componentJS += "class " + moduleName + " extends " + moduleType + " {\n\n";
            componentJS += "    " + moduleName + ": function () {\n\n";
            componentJS += "    }\n\n";
            componentJS += "}";

        }

        File file = new File((rootPath.endsWith("/") ? rootPath : rootPath + "/") + modulePackage.replace(".", "/") + "/");
        file.mkdirs();

        String fullPackagePath = file.getPath()+"/";

        file = new File(fullPackagePath + moduleNameFromUpper + ".spike");
        FileUtils.writeStringToFile(file, componentJS, "UTF-8");


        if (preprocessor != null) {

            String componentHTML = "";

            componentHTML += "<div class=\"" + moduleNameFromLower + moduleTypeFromUpper + "\">\n";
            componentHTML += "\n";
            componentHTML += "</div>\n";

            file = new File(fullPackagePath + moduleNameFromLower + ".html");
            FileUtils.writeStringToFile(file, componentHTML, "UTF-8");


            String componentCSS = "";

            componentCSS += "." + moduleNameFromLower + moduleTypeFromUpper + " { \n";
            componentCSS += "\n";
            componentCSS += "}\n";

            file = new File(fullPackagePath + moduleNameFromLower + "." + preprocessor.toLowerCase());
            FileUtils.writeStringToFile(file, componentCSS, "UTF-8");

        }

    }

}
