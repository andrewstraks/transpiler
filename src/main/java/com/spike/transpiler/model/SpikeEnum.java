package com.spike.transpiler.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class SpikeEnum {

    public static int PRIVATE_COUNTER = 1000;

    public SpikePackage classPackage = null;

    public final String type = "ENUM";

    public String enumName = null;
    public String enumFullName = null;

    public String privateClassName = null;

    public List<String> modificators = null;

    public String body = null;
    public String compiled = null;

    public HashMap<String, String> imports = new HashMap<>();

    public SpikeEnum(SpikePackage classPackage, String body, List<String> imports) {
        this.classPackage = classPackage;
        this.body = body.trim();
        this.collectImports(imports);
        this.collectModificator();
        this.collectEnumName();
        this.collectPackagesAndFullNames();

        //System.out.println(this.toString());
    }

    public void compile() {

        if (this.isPrivate()) {
            this.privateClassName = this.enumName + PRIVATE_COUNTER;
            PRIVATE_COUNTER++;
        }

        this.compiled = this.body.substring(this.body.indexOf("{"), this.body.lastIndexOf("}")+1);
        this.createAssemblerDeclaration();

    }

    private void createAssemblerDeclaration() {

        StringBuilder declaration = new StringBuilder();
        declaration
                .append("spike.core.Assembler.")
                .append("createStaticClass('")
                .append(this.classPackage.packageName)
                .append("','")
                .append(this.enumName).append("', ")
                .append("null")
                .append(",")
                .append(this.compiled)
                .append(");");


        SpikeFile.TOTAL_NAMESPACES++;
        this.compiled = declaration.toString();

    }

    private void collectPackagesAndFullNames() {
        this.enumFullName = this.classPackage.packageName + "." + this.enumName;
    }

    private void collectImports(List<String> imports) {

        for (String importLine : imports) {

            String importName = importLine.substring(0, importLine.indexOf("from")).replace("import", "").trim();
            String importFrom = importLine.substring(importLine.indexOf("from") + 4, importLine.length()).replace(";", "").trim();
            this.imports.put(importName, importFrom);

        }

    }

    private void collectModificator() {
        this.modificators = new ArrayList<>(Arrays.asList(this.body.substring(0, this.body.indexOf("enum")).trim().split(" ")));
        if (!this.modificators.contains("private")) {
            this.modificators.add("public");
        }
    }

    private void collectEnumName() {
        this.enumName = this.body.substring(this.body.indexOf("enum") + 5, this.body.indexOf("{")).trim();
    }

    public boolean isPrivate() {
        return this.modificators.contains("private");
    }

    @Override
    public String toString() {
        return "SpikeEnum{" +
                "classPackage=" + classPackage.packageName +
                ", type='" + type + '\'' +
                ", enumName='" + enumName + '\'' +
                ", enumFullName='" + enumFullName + '\'' +
                ", modificators=" + modificators +
                ", imports=" + imports +
                '}';
    }
}
