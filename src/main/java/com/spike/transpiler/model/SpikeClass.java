package com.spike.transpiler.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class SpikeClass {

    public static int PRIVATE_COUNTER = 100;

    public SpikePackage classPackage = null;

    public final String type = "CLASS";
    public String className = null;
    public String classFullName = null;

    public String privateClassName = null;

    public String extendsName = null;
    public String extendsFullName = null;

    public List<String> modificators = null;

    public String body = null;
    public String compiled = null;

    public HashMap<String, String> imports = new HashMap<>();
    public List<SpikeClassConstructor> constructors = new ArrayList<>();
    public List<SpikeClassField> fields = new ArrayList<>();
    public List<SpikeClassFunction> functions = new ArrayList<>();

    public SpikeClass(SpikePackage classPackage, String body, List<String> imports) {
        this.classPackage = classPackage;
        this.body = body.trim();
        this.collectImports(imports);
        this.collectModificator();
        this.collectClassName();
        this.collectExtendsName();
        this.collectClassFullName();
        this.collectFunctionNodes();
        this.collectExtendsFullName();
        this.createDefaultConstructor();
        this.createClassFunctions();

        this.classPackage.spikeFile.extendingMap.add(new ExtendingModel(this.extendsFullName, this.classFullName));
    }

    private void collectClassFullName(){
        this.classFullName = this.classPackage.packageName + "." + this.className;
    }

    private void collectExtendsFullName() {
        this.extendsFullName = this.imports.get(this.extendsName);
    }

    private void collectImports(List<String> imports) {

        for (String importLine : imports) {

            String importName = importLine.substring(0, importLine.indexOf("from")).replace("import", "").trim();
            String importFrom = importLine.substring(importLine.indexOf("from") + 4, importLine.length()).replace(";", "").trim();
            this.imports.put(importName, importFrom);

        }

    }

    private void collectModificator() {
        this.modificators = new ArrayList<>(Arrays.asList(this.body.substring(0, this.body.indexOf("class")).trim().split(" ")));
        if (!this.modificators.contains("private")) {
            this.modificators.add("public");
        }
    }

    private void collectClassName() {
        this.className = this.body.substring(this.body.indexOf("class") + 5, this.body.indexOf("{")).trim();

        if (this.className.contains("extends")) {
            this.className = this.className.substring(0, this.className.indexOf("extends")).trim();
        }
    }

    private void collectExtendsName() {

        this.extendsName = this.body.substring(this.body.indexOf("class"), this.body.indexOf("{")).trim();

        if (this.extendsName.contains("extends")) {
            this.extendsName = this.extendsName.substring(this.extendsName.indexOf("extends") + 7, this.extendsName.length()).trim();
        } else {
            this.extendsName = "";
        }

    }

    private void collectFunctionNodes() {

        boolean nodeCollecting = false;
        StringBuilder nodeBody = null;
        String[] lines = this.body.split("\n");

        int bracketsLeft = 0;
        int bracketsRight = 0;
        int squareBracketsLeft = 0;
        int squareBracketsRight = 0;

        boolean isSquareBrackets = false;
        boolean functionCollecting = false;

        boolean propCollecting = false;

        for (int i = 0, l = lines.length; i < l; i++) {

            if (i != l - 1 && i != 0) {

                String line = lines[i];

                if (!nodeCollecting) {

                    isSquareBrackets = false;
                    bracketsLeft = 0;
                    bracketsRight = 0;
                    squareBracketsLeft = 0;
                    squareBracketsRight = 0;

                    if (line.contains(":") && (line.contains("[") || line.contains("{")) && !line.contains("function")) {
                        nodeCollecting = true;
                        nodeBody = new StringBuilder();
                        propCollecting = true;

                        if (line.contains("[")) {
                            isSquareBrackets = true;
                        }

                    } else if (line.contains(":") && line.contains("function")) {
                        nodeCollecting = true;
                        nodeBody = new StringBuilder();
                        functionCollecting = true;
                    } else if (line.contains(":") && line.endsWith(",")) {
                        this.fields.add(new SpikeClassField(this, line));
                    }

                }

                if (nodeCollecting) {

                    if (functionCollecting) {

                        if (line.contains("{")) {
                            bracketsLeft++;
                        }

                        if (line.contains("}")) {
                            bracketsRight++;
                        }

                        if (bracketsLeft == bracketsRight) {
                            functionCollecting = false;
                            nodeCollecting = false;
                            nodeBody.append(line).append("\n");

                            String nodeBodyStr = nodeBody.toString();
                            if (nodeBodyStr.trim().startsWith(this.className)) {
                                this.constructors.add(new SpikeClassConstructor(this, nodeBodyStr));
                            } else {
                                this.functions.add(new SpikeClassFunction(this, nodeBodyStr));
                            }

                        }

                    } else if (propCollecting) {

                        boolean isEqualBrackets = false;
                        if (isSquareBrackets) {

                            if (line.contains("[")) {
                                squareBracketsLeft++;
                            }

                            if (line.contains("]")) {
                                squareBracketsRight++;
                            }

                            if (squareBracketsLeft == squareBracketsRight && squareBracketsLeft > 0) {
                                isEqualBrackets = true;
                            }

                        } else {

                            if (line.contains("{")) {
                                bracketsLeft++;
                            }

                            if (line.contains("}")) {
                                bracketsRight++;
                            }

                            if (bracketsLeft == bracketsRight && bracketsLeft > 0) {
                                isEqualBrackets = true;
                            }

                        }


                        if (isEqualBrackets) {
                            propCollecting = false;
                            nodeCollecting = false;
                            nodeBody.append(line).append("\n");
                            this.fields.add(new SpikeClassField(this, nodeBody.toString()));
                        }

                    }


                }

                if (nodeCollecting) {
                    nodeBody.append(line).append("\n");
                }


            }


        }


    }


    private boolean hasDefaultConstructor() {

        for (SpikeClassConstructor spikeClassConstructor : this.constructors) {
            if (spikeClassConstructor.isDefaultConstructor) {
                return true;
            }
        }

        return false;

    }

    private void createDefaultConstructor() {

        if (!this.hasDefaultConstructor()) {
            this.constructors.add(new SpikeClassConstructor(this, this.className + ":function(){}"));
        }

    }

    public boolean isPrivate() {
        return this.modificators.contains("private");
    }

    public boolean isStatic() {
        return this.modificators.contains("static");
    }

    public void compile() {

        if (this.isPrivate()) {
            this.privateClassName = this.className + PRIVATE_COUNTER;
            PRIVATE_COUNTER++;
        }

        StringBuilder compiledBuilder = new StringBuilder();

        for (SpikeClassConstructor spikeClassConstructor : this.constructors) {
            spikeClassConstructor.compile();
            compiledBuilder.append(spikeClassConstructor.compiled);
        }

        for (SpikeClassField spikeClassField : this.fields) {
            spikeClassField.compile();
            compiledBuilder.append(spikeClassField.compiled);
        }

        for (SpikeClassFunction spikeClassFunction : this.functions) {
            spikeClassFunction.compile();
            compiledBuilder.append(spikeClassFunction.compiled);
        }


            for (SpikeClassConstructor spikeClassConstructor : this.constructors) {

                if(!spikeClassConstructor.isDefaultConstructor){

                    compiledBuilder
                            .append(this.classPackage.packageName)
                            .append(".")
                            .append(spikeClassConstructor.constructorArgumentsUniqueName)
                            .append(".prototype=")
                            .append(this.classFullName)
                            .append(".prototype")
                            .append(";");

                }

            }

        this.compiled = compiledBuilder.toString();
        this.createAssemblerDeclaration();

    }

    private String collectConstructorsNames() {

        String constructorsNames = "";
        StringBuilder constructorNamesList = new StringBuilder();
        for (SpikeClassConstructor spikeClassConstructor : this.constructors) {
            constructorNamesList
                    .append(",'")
                    .append(spikeClassConstructor.constructorArgumentsUniqueName)
                    .append("'");
        }

        constructorsNames = constructorNamesList.toString();
        constructorsNames = constructorsNames.substring(1, constructorsNames.length());

        return constructorsNames;
    }

    private void createAssemblerDeclaration() {

        StringBuilder declaration = new StringBuilder();
        declaration.append("spike.core.Assembler.");

        if (this.isStatic()) {

            declaration
                    .append("createStaticClass('")
                    .append(this.classPackage.packageName)
                    .append("','")
                    .append(this.className).append("', ");

            if (this.extendsName != null) {
                declaration
                        .append("'")
                        .append(this.extendsFullName)
                        .append("'");
            } else {
                declaration.append("null");
            }

            declaration
                    .append(",")
                    .append("{" + this.compiled + "}")
                    .append(");");

        } else {

            declaration
                    .append("defineNamespace('")
                    .append(this.classPackage.packageName)
                    .append("',")
                    .append("[")
                    .append(this.collectConstructorsNames())
                    .append("],")
                    .append("function(){")
                    .append(this.compiled)
                    .append("});");
        }

        SpikeFile.TOTAL_NAMESPACES++;
        this.compiled = declaration.toString();

    }

    private void createClassFunctions() {

        this.functions.add(new SpikeClassFunction(this, "getSuper:function(){ return '" + (this.extendsName != null ? this.extendsFullName : this.classFullName) + "'; };"));
        this.functions.add(new SpikeClassFunction(this, "getClass:function(){ return '" + this.classFullName + "'; };"));

    }

    @Override
    public String toString() {
        return "SpikeClass{" +
                "classPackage=" + classPackage.packageName +
                ", type='" + type + '\'' +
                ", className='" + className + '\'' +
                ", classFullName='" + classFullName + '\'' +
                ", extendsName='" + extendsName + '\'' +
                ", extendsFullName='" + extendsFullName + '\'' +
                ", modificators=" + modificators +
                ", imports=" + imports +
                ", constructors=" + constructors +
                ", fields=" + fields.size() +
                ", functions=" + functions.size() +
                '}';
    }
}
