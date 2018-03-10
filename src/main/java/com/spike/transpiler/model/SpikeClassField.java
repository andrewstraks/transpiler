package com.spike.transpiler.model;

public class SpikeClassField {

    public SpikeClass spikeClass = null;
    public String fieldName = null;
    public String body = null;
    public String compiled = null;

    public SpikeClassField(SpikeClass spikeClass, String body) {
        this.spikeClass = spikeClass;
        this.body = body.trim();

            this.processVirtualField();
            this.collectFieldName();

    }

    private boolean isGlobalCondition(){
        return this.body.contains("@if") || this.body.contains("@endif");
    }
    private void processVirtualField() {

        if (this.body.contains("abstract")) {
            this.body = this.body.substring(this.body.lastIndexOf("abstract") + 8, this.body.length()).replace(";", "") + ":null,";
        }

    }

    private void collectFieldName() {

        if(!this.isGlobalCondition()){
            this.fieldName = this.body.substring(0, this.body.indexOf(":")).trim();
        }else{
            this.fieldName = "";
        }

    }

    public void compile() {


      if (this.spikeClass.isStatic() && !this.isGlobalCondition()) {

            if (this.body.endsWith(";")) {
                this.body = this.body.substring(0, this.body.lastIndexOf(";"));
            }

            if (!this.body.endsWith(",")) {
                this.body = this.body + ",";
            }

            this.compiled = this.body;
        } else if(!this.isGlobalCondition()){


            String fieldBody = this.body.substring(0, this.body.indexOf(":")) + "=" + this.body.substring(this.body.indexOf(":") + 1, this.body.length());

            if (fieldBody.trim().endsWith(",")) {
                fieldBody = fieldBody.substring(0, fieldBody.lastIndexOf(","));
            }

            StringBuilder compiledBuilder = new StringBuilder();

          compiledBuilder
                  .append(this.spikeClass.classFullName)
                  .append(".prototype.")
                  .append(fieldBody);

            if (!fieldBody.endsWith(";")) {
                compiledBuilder.append(";");
            }

            this.compiled = compiledBuilder.toString();

        }else{
          this.compiled = this.body+"\n";
      }

    }

    public String compileForConstructor() {


      if(!this.isGlobalCondition()){

            String fieldBody = "this."+this.body.substring(0, this.body.indexOf(":")) + "=" + this.body.substring(this.body.indexOf(":") + 1, this.body.length());

            if (fieldBody.trim().endsWith(",")) {
                fieldBody = fieldBody.substring(0, fieldBody.lastIndexOf(","));
            }

            StringBuilder compiledBuilder = new StringBuilder();

            compiledBuilder.append(fieldBody);

            if (!fieldBody.endsWith(";")) {
                compiledBuilder.append(";");
            }

           return compiledBuilder.toString();

        }

        return "";

    }


}
