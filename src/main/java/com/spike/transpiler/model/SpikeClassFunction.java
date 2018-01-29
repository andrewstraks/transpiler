package com.spike.transpiler.model;

public class SpikeClassFunction {

    public SpikeClass spikeClass = null;

    public String arguments = null;
    public String functionName = null;
    public String body = null;
    public String compiled = null;

    public SpikeClassFunction(SpikeClass spikeClass, String body) {
        this.spikeClass = spikeClass;
        this.body = body.trim();
        this.collectFunctionName();
        this.collectArguments();
    }

    private void collectArguments() {
        this.arguments = this.body.substring(this.body.indexOf("(") + 1, this.body.indexOf(")")).trim();
    }

    private void collectFunctionName() {
        this.functionName = this.body.substring(0, this.body.indexOf("function")).replaceAll(":", "").trim();
    }

    public void compile() {

        if (this.spikeClass.isStatic()) {

            if(this.body.endsWith(";")){
                this.body = this.body.substring(0, this.body.lastIndexOf(";"));
            }

            if(!this.body.endsWith(",")){
                this.body = this.body+",";
            }

            this.compiled = this.addThisKeywordReferenceStatic(this.body);
        } else {

            String functionBody = this.body.substring(this.body.indexOf("{"), this.body.length()).trim();

            if (functionBody.trim().endsWith(",")) {
                functionBody = functionBody.substring(0, functionBody.lastIndexOf(","));
            }

            StringBuilder compiledBuilder = new StringBuilder();

            compiledBuilder
                    .append(this.spikeClass.classFullName)
                    .append(".prototype.")
                    .append(this.functionName)
                    .append("=function(")
                    .append(this.arguments)
                    .append(")")
                    .append(this.addThisKeywordReference(functionBody));

            if (!functionBody.endsWith(";")) {
                compiledBuilder.append(";");
            }

            this.compiled = compiledBuilder.toString();

        }

    }

    private String addThisKeywordReference(String functionBody) {
        return "{var $this=this;" + functionBody.substring(functionBody.indexOf("{") + 1, functionBody.length());
    }

    private String addThisKeywordReferenceStatic(String functionBody) {
        return functionBody.substring(0, functionBody.indexOf("{")) + "{var $this=this;" + functionBody.substring(functionBody.indexOf("{") + 1, functionBody.length());
    }

}
