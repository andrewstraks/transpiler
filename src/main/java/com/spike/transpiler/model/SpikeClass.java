package com.spike.transpiler.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SpikeClass {

    public SpikePackage classPackage;

    public String className;
    public String classFullName;

    public String extendsName;
    public String extendsPackage;
    public String extendsFullName;

    public String modificator;

    public String body;
    public String compiled;

    public HashMap<String, String> imports = new HashMap<>();
    public List<SpikeClassConstructor> constructors = new ArrayList<>();
    public List<SpikeClassField> fields = new ArrayList<>();
    public List<SpikeClassFunction> functions = new ArrayList<>();

    private void collectImport(String importLine){

        String importName = importLine.substring(0, importLine.indexOf("from"));
        String importPackage = importLine.substring(importLine.indexOf("from"), importLine.length());

        this.imports.put(importName, importLine);

    }


//    public void createFunctionNodes() {
//
//        boolean nodeCollecting = false;
//        StringBuilder nodeBody = null;
//        String[] lines = this.body.split("\n");
//
//        int bracketsLeft = 0;
//        int bracketsRight = 0;
//        boolean functionCollecting = false;
//
//        boolean propCollecting = false;
//        for (int i = 0, l = lines.length; i < l; i++) {
//
//            if (i != l - 1 && i != 0) {
//
//                String line = lines[i];
//
//                if (!nodeCollecting) {
//
//                    if (line.indexOf(":") > -1 && line.endsWith(",")) {
//                        this.nodes.add(new JsNode(line, NestedLevel.FUNCTIONS, ""));
//                    } else if (line.indexOf(":") > -1 && line.indexOf("function") > -1) {
//                        nodeCollecting = true;
//                        nodeBody = new StringBuilder();
//                        functionCollecting = true;
//                    } else if (line.indexOf(":") > -1) {
//                        nodeCollecting = true;
//                        nodeBody = new StringBuilder();
//                        propCollecting = true;
//                    }
//
//                }
//
//                if (nodeCollecting) {
//
//                    if (functionCollecting) {
//
//                        if (line.indexOf("{") > -1) {
//                            bracketsLeft++;
//                        }
//
//                        if (line.indexOf("}") > -1) {
//                            bracketsRight++;
//                        }
//
//                        if (bracketsLeft == bracketsRight) {
//                            bracketsLeft = 0;
//                            bracketsRight = 0;
//                            functionCollecting = false;
//                            nodeCollecting = false;
//                            nodeBody.append(line + "\n");
//                            this.nodes.add(new JsNode(nodeBody.toString(), NestedLevel.FUNCTIONS, ""));
//                        }
//
//                    } else if (propCollecting) {
//
//                        if (i < l - 1) {
//
//                            if (lines[i + 1].indexOf("function") > -1) {
//                                propCollecting = false;
//                                nodeCollecting = false;
//                                nodeBody.append(line + "\n");
//                                this.nodes.add(new JsNode(nodeBody.toString(), NestedLevel.FUNCTIONS, ""));
//                            }
//
//                            int spaces = line.length() - line.replaceAll(" ", "").length();
//                            int beforeSpaces = lines[i - 1].length() - lines[i - 1].replaceAll(" ", "").length();
//
//                            if (spaces < beforeSpaces && line.endsWith(",")) {
//                                nodeCollecting = false;
//                                propCollecting = false;
//                                nodeBody.append(line + "\n");
//                                this.nodes.add(new JsNode(nodeBody.toString(), NestedLevel.FUNCTIONS, ""));
//                            }
//
//                        } else {
//                            nodeCollecting = false;
//                            propCollecting = false;
//                            nodeBody.append(line + "\n");
//                            this.nodes.add(new JsNode(nodeBody.toString(), NestedLevel.FUNCTIONS, ""));
//                        }
//
//
//                    }
//
//
//                }
//
//                if (nodeCollecting) {
//                    nodeBody.append(line + "\n");
//                }
//
//
//            }
//
//
//        }
//
//    }
//
//    public void compileClass(JsNode rootNode, JsNode packageNode, String packageName) {
//
//        String className = null;
//        String extendsName = null;
//
//        System.out.println("Compiling class full name: " + this.name);
//
//        if (this.name.indexOf("extends") > -1) {
//            className = this.name.substring(this.name.indexOf("class"), this.name.indexOf("extends")).replace("class", "").replace("extends", "").trim();
//            extendsName = this.name.substring(this.name.indexOf("extends"), this.name.length()).replace("extends", "").trim();
//        } else {
//            className = this.name.substring(this.name.indexOf("class"), this.name.length()).replace("class", "").trim();
//        }
//
//        rootNode.classNames.add(className);
//
//        System.out.println("Compiling class is private: " + this.isPrivate);
//        System.out.println("Compiling class is static: " + !this.isNotStatic);
//
//        if (this.isPrivate()) {
//            String oldClassName = className;
//            className += "__" + PRIVATE_COUNTER;
//            PRIVATE_COUNTER++;
//
//            rootNode.privateClassNames.put(oldClassName, className);
//        }
//
//        System.out.println("Compiling class strict name: " + className);
//
//        this.className = className;
//        this.extendsName = extendsName;
//
//        if (this.isNotStatic()) {
//
//
//
//            List<JsNode> constructors = new ArrayList<>();
//            List<JsNode> functionsAndFields = new ArrayList<>();
//
//            boolean hasDefaultConstrutor = false;
//
//            for (JsNode functionNode : this.nodes) {
//
//                if (functionNode.isConstructor(className)) {
//                    constructors.add(functionNode);
//
//                    if (functionNode.isDefaultConstructor(className)) {
//                        hasDefaultConstrutor = true;
//                    }
//
//                } else {
//                    functionsAndFields.add(functionNode);
//                }
//
//            }
//
//            System.out.println("Class has default constructor: " + hasDefaultConstrutor);
//
//            if (!hasDefaultConstrutor) {
//                constructors.add(this.createDefaultConstructor(packageName, this, className, extendsName));
//            }
//
//
//            List<String> constructorsNamespaces = new ArrayList<>();
//
//            for (JsNode constructorNode : constructors) {
//
//                String constructorClassName = constructorNode.compileConstructor(packageName, this, className, extendsName, rootNode);
//                constructorsNamespaces.add(constructorClassName);
//                this.compiled += constructorNode.compiled;
//
//                System.out.println("Compiling functions for constructor " + constructorClassName);
//
//                for (JsNode functionFieldNode : functionsAndFields) {
//                    functionFieldNode.compileFunction(packageName, this, className, extendsName, constructorClassName);
//                    this.compiled += functionFieldNode.compiled;
//                }
//
//                this.compiled += this.createClassFunctions(packageName, className, extendsName, constructorClassName);
//
//
//                addClassNode(constructorClassName, this.getExtendsFullNameFromImports(extendsName));
//
//            }
//
//
//
//            String constructorNamesArgs = "";
//            for (String constructorNameSpace : constructorsNamespaces) {
//                constructorNamesArgs += ",'" + constructorNameSpace.replace(packageName + ".", "") + "'";
//            }
//
//            this.compiled = "spike.core.Assembler.defineNamespace('" + packageName + "',[" + constructorNamesArgs.substring(1, constructorNamesArgs.length()) + "], function(){" + this.compiled + " });";
//            totalNamespaces++;
//
//        } else {
//
//            String classBody = this.body.substring(this.body.indexOf("{"), this.body.length());
//            this.compiled += "spike.core.Assembler.createStaticClass('" + packageName + "','" + className + "', " + (extendsName != null ? "'" + (extendsName.indexOf(".") == -1 ? packageName + "." + extendsName : extendsName) + "'" : "null") + "," + classBody + ");";
//            totalNamespaces++;
//        }
//
//    }
//
//
//    public String createClassFunctions(String packageName, String className, String extendsName, String constructorClassName) {
//
//        String compiled = "";
//
//        compiled += constructorClassName + ".prototype.getSuper = function(){ return '" + (extendsName != null ? extendsName : packageName + "." + className) + "'; };";
//        compiled += constructorClassName + ".prototype.getClass = function(){ return '" + packageName + "." + className + "'; };";
//
//        return compiled;
//
//    }
//
//    public boolean isConstructor(String className) {
//        return this.body.trim().startsWith(className);
//    }
//
//    public boolean isDefaultConstructor(String className) {
//        return this.body.substring(this.body.indexOf("(") + 1, this.body.indexOf(")")).trim().length() == 0;
//    }
//
//
//    public int getFunctionArgumentsLenght(String functionArguments) {
//
//        int functionArgumentsLength = 0;
//
//        if (!functionArguments.isEmpty()) {
//
//            if (functionArguments.contains(",")) {
//                functionArgumentsLength = functionArguments.split(",").length - 1;
//            } else {
//                functionArgumentsLength = 1;
//            }
//
//        }
//
//        return functionArgumentsLength;
//
//    }
//
//
//
//    public JsNode createDefaultConstructor(String packageName, JsNode classNode, String className, String extendsName) {
//
//        String compiled = "";
//
//        System.out.println("Creating default constructor name: " + className);
//
//        System.out.println("Creating for class full name: " + classNode.name);
//        System.out.println("Creating for class extends name: " + extendsName);
//
//        compiled = className + " : function(){    }";
//
//        System.out.println("Created default constructor: " + compiled);
//
//
//        return new JsNode(compiled, NestedLevel.FUNCTIONS, true);
//
//    }
//
//
//    public void compileConstructorUsages() throws Exception {
//
////            Pattern p = Pattern.compile("s\\([^\\)]*\\s+[^\\)]*\\)");
////            Matcher m = p.matcher(this.compiled);
////            while (m.find()) {
////                String temp = m.group();
////                this.compiled = this.compiled.replace(temp, temp.replaceAll("\\s", ""));
////            }
//
//
//        System.out.println(this.classNames);
//        System.out.println(this.privateClassNames);
//        System.out.println(this.constructorsMap);
//
//        for (Map.Entry<String, HashMap<Integer, String>> entry : this.constructorsMap.entrySet()) {
//
//            Map<Integer, String> constructors = entry.getValue();
//
//            String baseClassName = entry.getKey();
//
//            Pattern p = Pattern.compile("(new*\\s+[^\\)]*)");
//            Matcher m = p.matcher(this.compiled);
//            while (m.find()) {
//
//
//                String matchedConstructor = m.group();
//
//                if (matchedConstructor.contains(baseClassName)) {
//
//
//                    System.out.println("matchedConstructor: " + matchedConstructor);
//
//                    String className = matchedConstructor.substring(0, matchedConstructor.lastIndexOf("("));
//                    String argumentsList = matchedConstructor.substring(matchedConstructor.indexOf("("), matchedConstructor.length()).replace("(", "").trim();
//
//                    System.out.println("matchedConstructor className: " + className);
//                    System.out.println("matchedConstructor argumentsList: " + argumentsList);
//
//
//                    System.out.println("constructors : " + constructors);
//
//
//                    int functionArgumentsLenght = this.getFunctionArgumentsLenght(argumentsList);
//
//                    String constructorDetails = constructors.get(functionArgumentsLenght);
//
//                    if (constructorDetails == null) {
//
//                        System.out.println("total contructor : " + this.constructorsMap);
//                        throw new Exception("No matching constructor found for: " + matchedConstructor);
//                    }
//
//
//                    System.out.println("constructorDetails : " + constructorDetails);
//
//                    String[] constructorDetails2 = constructorDetails.split(";");
//
//                    System.out.println("replacing from " + matchedConstructor);
//                    System.out.println("to: " + matchedConstructor.replace(className, constructorDetails2[0]));
//
//                    if (constructorDetails2[0].contains("_")) {
//                        this.compiled = this.compiled.replace(matchedConstructor, "new " + matchedConstructor.replace(className, constructorDetails2[0]));
//                    }
//
//                }
//
//            }
//
////                for(Map.Entry<String, String> constructorEntry : constructors.entrySet()){
////
////                    String fullPathName = constructorEntry.getKey();
////                    String arguments = constructorEntry.getValue();
////
////                    System.out.println("Compiling full path name " +fullPathName);
////
////                }
//
//        }
//
//    }
//
//
//}


}
