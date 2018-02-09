package com.spike.transpiler.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class SpikeClassConstructor {

    public SpikeClass spikeClass = null;

    public boolean isDefaultConstructor = false;

    public String functionName = null;
    public String arguments = null;
    public Integer argumentsCount = null;
    public String constructorArgumentsUniqueName = null;
    public String body = null;
    public String compiled = null;


    public SpikeClassConstructor(SpikeClass spikeClass, String body) {
        this.spikeClass = spikeClass;
        this.body = body.trim();
        this.collectArguments();
        this.collectFunctionName();
        this.collectConstructorArgumentsUniqueNames();
        this.collectConstructorDetails();
    }

    private void collectArguments() {
        this.arguments = this.body.substring(this.body.indexOf("function") + 8, this.body.indexOf(")")).replace("(", "").trim().replaceAll("\\s+", "");
        this.argumentsCount = this.arguments.length() == 0 ? 0 : this.arguments.split(",").length;

        if (this.argumentsCount == 0) {
            this.isDefaultConstructor = true;
        }

    }

    private void collectConstructorDetails(){

        if(this.spikeClass.classPackage.spikeFile.constructorsMap.get(this.spikeClass.classFullName) == null){
            this.spikeClass.classPackage.spikeFile.constructorsMap.put(this.spikeClass.classFullName, new ArrayList<String>());
        }

        String constructorFullName = this.spikeClass.classPackage.packageName+"."+this.constructorArgumentsUniqueName;

        if(!this.spikeClass.classPackage.spikeFile.constructorsMap.get(this.spikeClass.classFullName).contains(constructorFullName)){
            this.spikeClass.classPackage.spikeFile.constructorsMap.get(this.spikeClass.classFullName).add(constructorFullName);
        }

    }

    private void collectFunctionName() {
        this.functionName = spikeClass.className;
    }

    private void collectConstructorArgumentsUniqueNames() {

        if (this.argumentsCount > 0) {
            this.constructorArgumentsUniqueName = this.functionName + "_" + this.argumentsCount;
        } else {
            this.constructorArgumentsUniqueName = this.functionName;
        }

    }

    public void compile() {

        if (this.spikeClass.isStatic()) {
            this.compiled = "";
        } else {


            String constructorBody = null;
            if (this.body.trim().endsWith(",")) {
                constructorBody = this.body.substring(this.body.indexOf("{") + 1, this.body.lastIndexOf(",")) + ";";
            } else {
                constructorBody = this.body.substring(this.body.indexOf("{") + 1, this.body.length()) + ";";
            }

            StringBuilder compiledBuilder = new StringBuilder();

            compiledBuilder
                    .append(this.spikeClass.classPackage.packageName)
                    .append(".")
                    .append(this.constructorArgumentsUniqueName)
                    .append("=function(")
                    .append(this.arguments)
                    .append("){")
                    .append(this.addThisKeywordReference(constructorBody));

            if (!constructorBody.endsWith(";")) {
                compiledBuilder.append(";");
            }

            this.compiled = compiledBuilder.toString();

        }
    }

    private String addThisKeywordReference(String constructorBody) {
        return "var $this=this;" + constructorBody;
    }

    @Override
    public String toString() {
        return "SpikeClassConstructor{" +
                "isDefaultConstructor=" + isDefaultConstructor +
                ", functionName='" + functionName + '\'' +
                ", arguments='" + arguments + '\'' +
                ", argumentsCount=" + argumentsCount +
                ", constructorArgumentsUniqueName='" + constructorArgumentsUniqueName + '\'' +
                '}';
    }
}
