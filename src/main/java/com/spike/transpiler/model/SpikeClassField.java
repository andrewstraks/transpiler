package com.spike.transpiler.model;

public class SpikeClassField {

    public SpikeClass spikeClass = null;
    public String fieldName = null;
    public String body = null;
    public String compiled = null;

    public SpikeClassField(SpikeClass spikeClass, String body) {
        this.spikeClass = spikeClass;
        this.body = body.trim();
        this.collectFieldName();

    }

    private void collectFieldName() {
        this.fieldName = this.body.substring(0, this.body.indexOf(":")).trim();
    }

    public void compile() {

        if (this.spikeClass.isStatic()) {

            if(this.body.endsWith(";")){
                this.body = this.body.substring(0, this.body.lastIndexOf(";"));
            }

            if(!this.body.endsWith(",")){
                this.body = this.body+",";
            }

            this.compiled = this.body;
        } else {


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

        }

    }


}
