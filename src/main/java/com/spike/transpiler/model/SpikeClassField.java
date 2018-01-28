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

//            for (SpikeClassConstructor spikeClassConstructor : this.spikeClass.constructors) {
//
//                if(!spikeClassConstructor.isDefaultConstructor){
//
//                    compiledBuilder
//                            .append(this.spikeClass.classPackage.packageName)
//                            .append(".")
//                            .append(spikeClassConstructor.constructorArgumentsUniqueName)
//                            .append(".prototype.")
//                            .append(this.fieldName)
//                            .append("=")
//                            .append(this.spikeClass.classFullName)
//                            .append(".")
//                            .append(this.fieldName)
//                            .append(";");
//
//                }
//
//            }

            this.compiled = compiledBuilder.toString();

        }

    }


}
