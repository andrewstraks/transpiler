package com.spike.transpiler;

import com.spike.imports.NewImportCompiler;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Dawid on 2017-01-29.
 */
public class ScriptsCompiler {

    static HashMap<String, String> extendingFromTo = new HashMap<>();

    static int totalNamespaces = 0;

    static NewImportCompiler importsCompiler = new NewImportCompiler();

    static int PRIVATE_COUNTER = 100;

    enum NestedLevel {

        FILE,
        ROOT,
        CLASS,
        FUNCTIONS,
        IMPORT

    }

    static ArrayList<ClassNode> classNodes = new ArrayList<>();

    class ClassNode {
        public String className;
        public ClassNode extend;

        public ClassNode(String className, ClassNode extend) {
            this.className = className;
            this.extend = extend;
        }

    }

    enum FunctionType {
        CONSTRUCTOR,
        FIELD,
        FUNCTION
    }

    class JsNode {

        public void addClassNode(String className, String extendsName){

            classNodes.add(new ClassNode());

        }

        String compiled;
        String name;
        String body;
        NestedLevel level;

        List<JsNode> nodes;
        List<JsNode> imports = new ArrayList<>();

        public List<String> classNames = new ArrayList<>();
        public HashMap<String, String> privateClassNames = new HashMap<>();
        public HashMap<String, HashMap<Integer, String>> constructorsMap = new HashMap<String, HashMap<Integer, String>>();

        public JsNode(String body, NestedLevel level, Boolean complete) {
            this.body = body;
            this.name = "";
            this.level = level;
        }

        public JsNode(String body, NestedLevel level) {

            this.compiled = "";
            this.level = level;
            this.body = body.trim();

            switch (level) {
                case CLASS:
                    this.name = body.substring(0, body.indexOf("{")).trim();
                    break;
                case ROOT:
                    this.name = body.substring(0, body.indexOf(";")).replace("package", "").trim();
                default:
                    this.name = body.substring(0, body.indexOf(" "));
                    break;
            }

            if (level == NestedLevel.CLASS) {
                this.isNotStatic = this.body.trim().substring(0, 10).indexOf("static") == -1;
                this.isPrivate = this.body.trim().substring(0, 20).indexOf("private") > -1;
            }

            this.createNodes();

        }

        boolean isNotStatic = true;
        boolean isPrivate = true;

        public boolean isNotStatic() {
            return this.isNotStatic;
        }

        public boolean isPrivate() {
            return this.isPrivate;
        }

        public void createNodes() {
            this.nodes = new ArrayList<>();

            switch (this.level) {
                case FILE:
                    this.createFileNodes();
                    break;
                case ROOT:
                    this.createClassNodes();
                    break;
                case CLASS:

                    if (this.isNotStatic()) {
                        this.createFunctionNodes();
                    }

                    break;
            }


        }

        public void createFunctionNodes() {

            boolean nodeCollecting = false;
            StringBuilder nodeBody = null;
            String[] lines = this.body.split("\n");

            int bracketsLeft = 0;
            int bracketsRight = 0;
            boolean functionCollecting = false;

            boolean propCollecting = false;
            for (int i = 0, l = lines.length; i < l; i++) {

                if (i != l - 1 && i != 0) {

                    String line = lines[i];

                    if (!nodeCollecting) {

                        if (line.indexOf(":") > -1 && line.endsWith(",")) {
                            this.nodes.add(new JsNode(line, NestedLevel.FUNCTIONS));
                        } else if (line.indexOf(":") > -1 && line.indexOf("function") > -1) {
                            nodeCollecting = true;
                            nodeBody = new StringBuilder();
                            functionCollecting = true;
                        } else if (line.indexOf(":") > -1) {
                            nodeCollecting = true;
                            nodeBody = new StringBuilder();
                            propCollecting = true;
                        }

                    }

                    if (nodeCollecting) {

                        if (functionCollecting) {

                            if (line.indexOf("{") > -1) {
                                bracketsLeft++;
                            }

                            if (line.indexOf("}") > -1) {
                                bracketsRight++;
                            }

                            if (bracketsLeft == bracketsRight) {
                                bracketsLeft = 0;
                                bracketsRight = 0;
                                functionCollecting = false;
                                nodeCollecting = false;
                                nodeBody.append(line + "\n");
                                this.nodes.add(new JsNode(nodeBody.toString(), NestedLevel.FUNCTIONS));
                            }

                        } else if (propCollecting) {

                            if (i < l - 1) {

                                if (lines[i + 1].indexOf("function") > -1) {
                                    propCollecting = false;
                                    nodeCollecting = false;
                                    nodeBody.append(line + "\n");
                                    this.nodes.add(new JsNode(nodeBody.toString(), NestedLevel.FUNCTIONS));
                                }

                                int spaces = line.length() - line.replaceAll(" ", "").length();
                                int beforeSpaces = lines[i - 1].length() - lines[i - 1].replaceAll(" ", "").length();

                                if (spaces < beforeSpaces && line.endsWith(",")) {
                                    nodeCollecting = false;
                                    propCollecting = false;
                                    nodeBody.append(line + "\n");
                                    this.nodes.add(new JsNode(nodeBody.toString(), NestedLevel.FUNCTIONS));
                                }

                            } else {
                                nodeCollecting = false;
                                propCollecting = false;
                                nodeBody.append(line + "\n");
                                this.nodes.add(new JsNode(nodeBody.toString(), NestedLevel.FUNCTIONS));
                            }


                        }


                    }

                    if (nodeCollecting) {
                        nodeBody.append(line + "\n");
                    }


                }


            }

        }

        public void createFileNodes() {

            String[] packagesDeclarations = this.body.split("package");

            for (String packageScope : packagesDeclarations) {

                if (packageScope.trim().length() > 0) {
                    this.nodes.add(new JsNode("package" + packageScope, NestedLevel.ROOT));
                }

            }

        }

        public void createClassNodes() {

            boolean nodeCollecting = false;
            StringBuilder nodeBody = null;
            String[] lines = this.body.split("\n");
            for (int i = 0, l = lines.length; i < l; i++) {

                String line = lines[i].trim();
                int keywordIndexEnd = line.indexOf(" ");

                if (keywordIndexEnd > 4) {

                    String keyword = line.substring(0, line.indexOf(" "));

                    switch (keyword) {
                        case "import":
                            this.imports.add(new JsNode(line, NestedLevel.IMPORT));
                            break;
                        case "private":
                        case "static":
                        case "class":

                            if (nodeCollecting) {
                                nodeCollecting = false;
                                this.nodes.add(new JsNode(nodeBody.toString(), NestedLevel.CLASS));
                                nodeBody = null;
                            }

                            nodeCollecting = true;
                            nodeBody = new StringBuilder();
                            break;
                    }

                }

                if (i == l - 1) {
                    nodeBody.append(lines[i] + "\n");
                    nodeCollecting = false;
                    this.nodes.add(new JsNode(nodeBody.toString(), NestedLevel.CLASS));
                    nodeBody = null;
                }

                if (nodeCollecting) {
                    nodeBody.append(lines[i] + "\n");
                }

            }

        }

        @Override
        public String toString() {
            return "JsNode{" +
                    "name='" + name + '\'' +
                    ", body='" + body + '\'' +
                    ", nodes=" + nodes +
                    '}';
        }

        public void compileClass(JsNode rootNode, JsNode packageNode, String packageName) {

            String className = null;
            String extendsName = null;

            System.out.println("Compiling class full name: " + this.name);

            if (this.name.indexOf("extends") > -1) {
                className = this.name.substring(this.name.indexOf("class"), this.name.indexOf("extends")).replace("class", "").replace("extends", "").trim();
                extendsName = this.name.substring(this.name.indexOf("extends"), this.name.length()).replace("extends", "").trim();
            } else {
                className = this.name.substring(this.name.indexOf("class"), this.name.length()).replace("class", "").trim();
            }

            rootNode.classNames.add(className);

            System.out.println("Compiling class is private: " + this.isPrivate);
            System.out.println("Compiling class is static: " + !this.isNotStatic);

            if (this.isPrivate()) {
                String oldClassName = className;
                className += "__" + PRIVATE_COUNTER;
                PRIVATE_COUNTER++;

                rootNode.privateClassNames.put(oldClassName, className);
            }

            System.out.println("Compiling class strict name: " + className);

            if (this.isNotStatic()) {


                addClassNode(className, extendsName);

                List<JsNode> constructors = new ArrayList<>();
                List<JsNode> functionsAndFields = new ArrayList<>();

                boolean hasDefaultConstrutor = false;

                for (JsNode functionNode : this.nodes) {

                    if (functionNode.isConstructor(className)) {
                        constructors.add(functionNode);

                        if (functionNode.isDefaultConstructor(className)) {
                            hasDefaultConstrutor = true;
                        }

                    } else {
                        functionsAndFields.add(functionNode);
                    }

                }

                System.out.println("Class has default constructor: " + hasDefaultConstrutor);

                if (!hasDefaultConstrutor) {
                    constructors.add(this.createDefaultConstructor(packageName, this, className, extendsName));
                }


                List<String> constructorsNamespaces = new ArrayList<>();

                for (JsNode constructorNode : constructors) {

                    String constructorClassName = constructorNode.compileConstructor(packageName, this, className, extendsName, rootNode);
                    constructorsNamespaces.add(constructorClassName);
                    this.compiled += constructorNode.compiled;

                    System.out.println("Compiling functions for constructor " + constructorClassName);

                    for (JsNode functionFieldNode : functionsAndFields) {
                        functionFieldNode.compileFunction(packageName, this, className, extendsName, constructorClassName);
                        this.compiled += functionFieldNode.compiled;
                    }

                    this.compiled += this.createClassFunctions(packageName, className, extendsName, constructorClassName);

                }

                String constructorNamesArgs = "";
                for (String constructorNameSpace : constructorsNamespaces) {
                    constructorNamesArgs += ",'" + constructorNameSpace.replace(packageName + ".", "") + "'";
                }

                this.compiled = "spike.core.Assembler.defineNamespace('" + packageName + "',[" + constructorNamesArgs.substring(1, constructorNamesArgs.length()) + "], function(){" + this.compiled + " });";
                totalNamespaces++;

            } else {

                String classBody = this.body.substring(this.body.indexOf("{"), this.body.length());
                this.compiled += "spike.core.Assembler.createStaticClass('" + packageName + "','" + className + "', " + (extendsName != null ? "'" + (extendsName.indexOf(".") == -1 ? packageName + "." + extendsName : extendsName) + "'" : "null") + "," + classBody + ");";
                totalNamespaces++;
            }

        }

        public String createClassFunctions(String packageName, String className, String extendsName, String constructorClassName) {

            String compiled = "";

            compiled += constructorClassName + ".prototype.getSuper = function(){ return '" + (extendsName != null ? extendsName : packageName + "." + className) + "'; };";
            compiled += constructorClassName + ".prototype.getClass = function(){ return '" + packageName + "." + className + "'; };";

            return compiled;

        }

        public boolean isConstructor(String className) {
            return this.body.trim().startsWith(className);
        }

        public boolean isDefaultConstructor(String className) {
            return this.body.substring(this.body.indexOf("(") + 1, this.body.indexOf(")")).trim().length() == 0;
        }

        public int getFunctionArgumentsLenght(String functionArguments){

            int functionArgumentsLength = 0;

            if(!functionArguments.isEmpty()){

                if(functionArguments.contains(",")){
                    functionArgumentsLength = functionArguments.split(",").length - 1;
                }else{
                    functionArgumentsLength = 1;
                }

            }

            return functionArgumentsLength;

        }


        public JsNode createDefaultConstructor(String packageName, JsNode classNode, String className, String extendsName) {

            String compiled = "";

            System.out.println("Creating default constructor name: " + className);

            System.out.println("Creating for class full name: " + classNode.name);
            System.out.println("Creating for class extends name: " + extendsName);

            compiled = className + " : function(){    }";

            System.out.println("Created default constructor: " + compiled);


            return new JsNode(compiled, NestedLevel.FUNCTIONS, true);

        }

        public String compileConstructor(String packageName, JsNode classNode, String className, String extendsName, JsNode rootNode) {

            String constructorClassName = packageName + "." + className;
            String superConstructorName = packageName + "." + this.body.substring(0, this.body.indexOf(":"));

            System.out.println("Compiling constructor name2: " + this.name);
            System.out.println("Compiling constructor body2: " + this.body);


            System.out.println("Compiling for class full name: " + classNode.name);
            System.out.println("Compiling for class extends name: " + extendsName);

            String functionArguments = this.body.substring(this.body.indexOf("function") + 8, this.body.indexOf(")")).replace("(", "");
            System.out.println("Constructor args: " + functionArguments);

            String[] argsArray = functionArguments.trim().split(",");
            for (String arg : argsArray) {
                if (arg.trim().length() > 0) {
                    constructorClassName += "_" + arg.trim();
                }
            }

            if (rootNode.constructorsMap.get(packageName + "." + className) == null) {
                rootNode.constructorsMap.put(packageName + "." + className, new HashMap<Integer, String>());
            }


            int functionArgumentsLenght = this.getFunctionArgumentsLenght(functionArguments);

            rootNode.constructorsMap.get(packageName + "." + className).put(functionArgumentsLenght, constructorClassName + ";" + functionArguments);

            constructorClassName = constructorClassName.trim();
            superConstructorName = superConstructorName.trim();

            this.compiled = constructorClassName + " = function(" + functionArguments + "){";

            System.out.println("Constructor superConstructorName :" + superConstructorName);
            System.out.println("Constructor constructorClassName :" + constructorClassName);

            if (!superConstructorName.equals(constructorClassName)) {
              //  this.compiled += superConstructorName + ".apply(this, []);";

                //this.compiled += packageName + "." + className+".prototype = new "+superConstructorName+"();";

                extendingFromTo.put(superConstructorName, packageName + "." + className);
                //zbudowac lancuch dziedziczenia w transpilerze i na jego podstawie sortowac dziedziczenie

                //    extend(Config1.prototype, Config2.prototype);

            } else if (extendsName != null) {
             //   this.compiled += extendsName +  ".apply(this, []);";
               // this.compiled += packageName + "." + className+".prototype = new "+extendsName+"();";
              //  this.compiled += "if (!(this instanceof "+packageName+"."+className+")){    return new "+packageName+"."+className+"();  }";

                extendingFromTo.put(extendsName,packageName + "." + className);
                //zbudowac lancuch dziedziczenia w transpilerze i na jego podstawie sortowac dziedziczenie

            }

            if (this.body.trim().endsWith(",")) {
                this.compiled += this.body.substring(this.body.indexOf("{") + 1, this.body.lastIndexOf(",")) + ";";
            } else {
                this.compiled += this.body.substring(this.body.indexOf("{") + 1, this.body.length()) + ";";
            }


            return constructorClassName;

        }

        public void compileFunction(String packageName, JsNode classNode, String className, String extendsName, String constructorClassName) {

            System.out.println("Compiling function name: " + this.name);
            System.out.println("Compiling function body: " + this.body);

            System.out.println("Compiling for class full name: " + classNode.name);
            System.out.println("Compiling for class extends name: " + extendsName);

            if (this.body.trim().indexOf("function") > -1) {

                String functionDeclaration = this.body.trim().substring(0, this.body.indexOf(")") - 1);
                String functionBody = this.body.replace(functionDeclaration, "").trim();

                if (functionBody.trim().endsWith(",")) {
                    functionBody = functionBody.substring(0, functionBody.lastIndexOf(","));
                }


                this.compiled += constructorClassName + ".prototype." + functionDeclaration.replace(":", "=") + functionBody + ";";

                System.out.println("Compiled fn: "+constructorClassName + ".prototype." + functionDeclaration.replace(":", "=") + functionBody + ";");

                //Fields compile
            } else {

                System.out.println("Compiling field " + this.body);

                String fieldBody = this.body.substring(0, this.body.indexOf(":")) + "=" + this.body.substring(this.body.indexOf(":") + 1, this.body.length());

                if (fieldBody.trim().endsWith(",")) {
                    fieldBody = fieldBody.substring(0, fieldBody.lastIndexOf(","));
                }


                this.compiled += constructorClassName + ".prototype." + fieldBody + ";";


            }


        }

        public void compilePackageImports() {

            for (JsNode importNode : this.imports) {

                String importName = importNode.body.substring(0, importNode.body.indexOf("from"));
                importName = importName.replace("import", "").trim();

                String importFullPath = importNode.body.substring(importNode.body.indexOf("from"), importNode.body.length());
                importFullPath = importFullPath.replace("from", "").replace(";", "").trim();

                System.out.println("Replacing import " + importName + " - " + importFullPath);

              Pattern p = Pattern.compile("\\b" + Pattern.quote(importFullPath) + "\\b");
                Matcher m = p.matcher(this.compiled);
                while (m.find()) {
                String temp = m.group();

                System.out.println("Found to replace: "+temp);

              //  this.compiled = this.compiled.replace(temp, temp.replaceAll("\\s", ""));
                }

                this.compiled = this.compiled.replaceAll("\\b" + Pattern.quote(importFullPath) + "\\b", importName);
                this.compiled = this.compiled.replaceAll("\\b" + Pattern.quote(importName) + "\\b", importFullPath);

            }

        }

        public void compileConstructorUsages() throws Exception {

//            Pattern p = Pattern.compile("s\\([^\\)]*\\s+[^\\)]*\\)");
//            Matcher m = p.matcher(this.compiled);
//            while (m.find()) {
//                String temp = m.group();
//                this.compiled = this.compiled.replace(temp, temp.replaceAll("\\s", ""));
//            }


            System.out.println(this.classNames);
            System.out.println(this.privateClassNames);
            System.out.println(this.constructorsMap);

            for (Map.Entry<String, HashMap<Integer, String>> entry : this.constructorsMap.entrySet()) {

                Map<Integer, String> constructors = entry.getValue();

                String baseClassName = entry.getKey();

                Pattern p = Pattern.compile("(new*\\s+[^\\)]*)");
                Matcher m = p.matcher(this.compiled);
                while (m.find()) {


                    String matchedConstructor = m.group();

                    if (matchedConstructor.contains(baseClassName)) {


                        System.out.println("matchedConstructor: " + matchedConstructor);

                        String className = matchedConstructor.substring(0, matchedConstructor.lastIndexOf("("));
                        String argumentsList = matchedConstructor.substring(matchedConstructor.indexOf("("), matchedConstructor.length()).replace("(", "").trim();

                        System.out.println("matchedConstructor className: " + className);
                        System.out.println("matchedConstructor argumentsList: " + argumentsList);


                        System.out.println("constructors : " + constructors);


                        int functionArgumentsLenght = this.getFunctionArgumentsLenght(argumentsList);

                        String constructorDetails = constructors.get(functionArgumentsLenght);

                        if (constructorDetails == null) {

                            System.out.println("total contructor : " + this.constructorsMap);
                            throw new Exception("No matching constructor found for: " + matchedConstructor);
                        }


                        System.out.println("constructorDetails : " + constructorDetails);

                        String[] constructorDetails2 = constructorDetails.split(";");

                        System.out.println("replacing from "+matchedConstructor);
                        System.out.println("to: "+matchedConstructor.replace(className, constructorDetails2[0]));

                        if(constructorDetails2[0].contains("_")){
                            this.compiled = this.compiled.replace(matchedConstructor, "new "+matchedConstructor.replace(className, constructorDetails2[0]));
                        }

                    }

                }

//                for(Map.Entry<String, String> constructorEntry : constructors.entrySet()){
//
//                    String fullPathName = constructorEntry.getKey();
//                    String arguments = constructorEntry.getValue();
//
//                    System.out.println("Compiling full path name " +fullPathName);
//
//                }

            }

        }


    }


    public void compileNodes(JsNode rootNode) throws Exception {

        for (JsNode packageNode : rootNode.nodes) {

            String packageName = packageNode.body.substring(packageNode.body.indexOf("package"), packageNode.body.indexOf(";")).replace("package", "").trim();

            System.out.println("Compiling package: " + packageName);

            for (JsNode classNode : packageNode.nodes) {
                classNode.compileClass(rootNode, packageNode, packageName);
                packageNode.compiled += classNode.compiled;
            }

            packageNode.compilePackageImports();

            rootNode.compiled += packageNode.compiled;

        }

        rootNode.compileConstructorUsages();

    }


    public String compileSyntax(String fileBody) throws Exception {

        long start = System.currentTimeMillis();

        fileBody = removeComments(fileBody);

        if (hasClass(fileBody)) {

            if (!hasPackage(fileBody)) {
                throw new Exception("Class file has to have package declaration");
            }

            JsNode rootNode = new JsNode(fileBody, NestedLevel.FILE);
            this.compileNodes(rootNode);

            rootNode.compiled = "var __spike_tn = "+totalNamespaces+";"+rootNode.compiled;

            //zbudowac lancuch dziedziczenia w transpilerze i na jego podstawie sortowac dziedziczenie
            // compiloewac importy ponownie
            for(Map.Entry<String, String> extendingMap : extendingFromTo.entrySet()) {
//
//                    String fullPathName = constructorEntry.getKey();
//                    String arguments = constructorEntry.getValue();

                rootNode.compiled += "extend("+extendingMap.getKey()+","+extendingMap.getValue()+");";
            }

           // extendingFromTo.put(extendsName,packageName + "." + className);


            System.out.println("Transpilation takes: "+(System.currentTimeMillis() - start) +"ms");

            return rootNode.compiled;

        }

        return null;

    }

    public String removeComments(String fileBody) {

        StringBuilder builder = new StringBuilder();
        String[] splitted = fileBody.split("\n");

        boolean multiComment = false;
        for (int i = 0, l = splitted.length; i < l; i++) {

            if (splitted[i].trim().indexOf("*/") > -1) {
                multiComment = false;
            } else if (splitted[i].trim().indexOf("/*") > -1) {
                multiComment = true;
            } else if (multiComment == false && !splitted[i].trim().startsWith("//")) {
                builder.append(splitted[i] + "\n");
            }

        }

        return builder.toString().trim();

    }

    public boolean hasClass(String fileBody) {
        return fileBody.indexOf("class ") > -1;
    }

    public boolean hasPackage(String fileBody) {
        return fileBody.startsWith("package");
    }

}
