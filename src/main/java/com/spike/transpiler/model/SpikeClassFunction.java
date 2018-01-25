package com.spike.transpiler.model;

public class SpikeClassFunction {

    public String argumentsStr;
    public String body;
    public String compiled;

//    public void compileFunction(String packageName, JsNode classNode, String className, String extendsName, String constructorClassName) {
//
//        System.out.println("Compiling function name: " + this.name);
//        System.out.println("Compiling function body: " + this.body);
//
//        System.out.println("Compiling for class full name: " + classNode.name);
//        System.out.println("Compiling for class extends name: " + extendsName);
//
//        if (this.body.trim().indexOf("function") > -1) {
//
//            String functionDeclaration = this.body.trim().substring(0, this.body.indexOf(")") - 1);
//            String functionBody = this.body.replace(functionDeclaration, "").trim();
//
//            if (functionBody.trim().endsWith(",")) {
//                functionBody = functionBody.substring(0, functionBody.lastIndexOf(","));
//            }
//
//
//            this.compiled += constructorClassName + ".prototype." + functionDeclaration.replace(":", "=") + functionBody + ";";
//
//            System.out.println("Compiled fn: " + constructorClassName + ".prototype." + functionDeclaration.replace(":", "=") + functionBody + ";");
//
//            //Fields compile
//        } else {
//
//            System.out.println("Compiling field " + this.body);
//
//            String fieldBody = this.body.substring(0, this.body.indexOf(":")) + "=" + this.body.substring(this.body.indexOf(":") + 1, this.body.length());
//
//            if (fieldBody.trim().endsWith(",")) {
//                fieldBody = fieldBody.substring(0, fieldBody.lastIndexOf(","));
//            }
//
//
//            this.compiled += constructorClassName + ".prototype." + fieldBody + ";";
//
//
//        }
//
//
//    }

}
