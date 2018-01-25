package com.spike.transpiler.model;

import java.util.HashMap;

public class SpikeClassConstructor {

    public boolean isDefaultConstructor = false;

    public String argumentsStr;
    public Integer argumentsCount;
    public String body;
    public String compiled;


//
//
//    public String compileConstructor(String packageName, JsNode classNode, String className, String extendsName, JsNode rootNode) {
//
//        String constructorClassName = packageName + "." + className;
//        String superConstructorName = packageName + "." + this.body.substring(0, this.body.indexOf(":"));
//
//        System.out.println("Compiling constructor name2: " + this.name);
//        System.out.println("Compiling constructor body2: " + this.body);
//
//
//        System.out.println("Compiling for class full name: " + classNode.name);
//        System.out.println("Compiling for class extends name: " + extendsName);
//
//        String functionArguments = this.body.substring(this.body.indexOf("function") + 8, this.body.indexOf(")")).replace("(", "");
//        System.out.println("Constructor args: " + functionArguments);
//
//        String[] argsArray = functionArguments.trim().split(",");
//        for (String arg : argsArray) {
//            if (arg.trim().length() > 0) {
//                constructorClassName += "_" + arg.trim();
//            }
//        }
//
//        if (rootNode.constructorsMap.get(packageName + "." + className) == null) {
//            rootNode.constructorsMap.put(packageName + "." + className, new HashMap<Integer, String>());
//        }
//
//
//        int functionArgumentsLenght = this.getFunctionArgumentsLenght(functionArguments);
//
//        rootNode.constructorsMap.get(packageName + "." + className).put(functionArgumentsLenght, constructorClassName + ";" + functionArguments);
//
//        constructorClassName = constructorClassName.trim();
//        superConstructorName = superConstructorName.trim();
//
//        this.compiled = constructorClassName + " = function(" + functionArguments + "){";
//
//        System.out.println("Constructor superConstructorName :" + superConstructorName);
//        System.out.println("Constructor constructorClassName :" + constructorClassName);
//
//        if (!superConstructorName.equals(constructorClassName)) {
//            //  this.compiled += superConstructorName + ".apply(this, []);";
//
//            //this.compiled += packageName + "." + className+".prototype = new "+superConstructorName+"();";
//
//            extendingFromTo.put(superConstructorName, packageName + "." + className);
//            //zbudowac lancuch dziedziczenia w transpilerze i na jego podstawie sortowac dziedziczenie
//
//            //    extend(Config1.prototype, Config2.prototype);
//
//        } else if (extendsName != null) {
//            //   this.compiled += extendsName +  ".apply(this, []);";
//            // this.compiled += packageName + "." + className+".prototype = new "+extendsName+"();";
//            //  this.compiled += "if (!(this instanceof "+packageName+"."+className+")){    return new "+packageName+"."+className+"();  }";
//
//            extendingFromTo.put(extendsName, packageName + "." + className);
//            //zbudowac lancuch dziedziczenia w transpilerze i na jego podstawie sortowac dziedziczenie
//
//        }
//
//        if (this.body.trim().endsWith(",")) {
//            this.compiled += this.body.substring(this.body.indexOf("{") + 1, this.body.lastIndexOf(",")) + ";";
//        } else {
//            this.compiled += this.body.substring(this.body.indexOf("{") + 1, this.body.length()) + ";";
//        }
//
//
//        return constructorClassName;
//
//    }

}
