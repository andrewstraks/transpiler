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

    public String extendsConstructorsDeclarations = null;
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
        this.createWrapConstructor();
        this.createClassFunctions();

        this.classPackage.spikeFile.extendingMap.add(new ExtendingModel(this.extendsFullName, this.classFullName));
    }

    private boolean isInterface(){
        return this.body.startsWith("interface");
    }

    private void collectClassFullName() {
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

        if(this.isInterface()){
            this.modificators = new ArrayList<>();
        }else{

            this.modificators = new ArrayList<>(Arrays.asList(this.body.substring(0, this.body.indexOf("class")).trim().split(" ")));
            if (!this.modificators.contains("private")) {
                this.modificators.add("public");
            }

        }

    }

    private void collectClassName() {

        if(this.isInterface()){

            this.className = this.body.substring(this.body.indexOf("interface") + 5, this.body.indexOf("{")).trim();

            if (this.className.contains("interface")) {
                this.className = this.className.substring(0, this.className.indexOf("interface")).trim();
            }

        }else{

            this.className = this.body.substring(this.body.indexOf("class") + 5, this.body.indexOf("{")).trim();

            if (this.className.contains("extends")) {
                this.className = this.className.substring(0, this.className.indexOf("extends")).trim();
            }

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

                    if (line.contains("@if") || line.contains("@endif")) {
                        this.fields.add(new SpikeClassField(this, line));
                    } else if (line.contains(":") && (line.contains("[") || line.contains("{")) && !line.contains("function")) {
                        nodeCollecting = true;
                        nodeBody = new StringBuilder();
                        propCollecting = true;

                        if (line.contains("[")) {
                            isSquareBrackets = true;
                        }

                    } else if (line.contains("function") && line.contains("abstract")) {
                        this.functions.add(new SpikeClassFunction(this, line));
                    } else if (line.contains(":") && line.contains("function")) {
                        nodeCollecting = true;
                        nodeBody = new StringBuilder();
                        functionCollecting = true;
                    } else if (line.contains("abstract")) {
                        this.fields.add(new SpikeClassField(this, line));
                    } else if (line.contains(":")) {
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


    private boolean hasWrapConstructor() {

        for (SpikeClassConstructor spikeClassConstructor : this.constructors) {
            if (spikeClassConstructor.isWrapConstructor) {
                return true;
            }
        }

        return false;

    }

    private boolean hasDefaultConstructor() {

        for (SpikeClassConstructor spikeClassConstructor : this.constructors) {
            if (spikeClassConstructor.isDefaultConstructor) {
                return true;
            }
        }

        return false;

    }

    private String createConstructor() {

        StringBuilder fieldsBuilder = new StringBuilder();
        for (SpikeClassField spikeClassField : this.fields) {
            fieldsBuilder.append(spikeClassField.compileForConstructor());
        }


        StringBuilder constructorBuilder = new StringBuilder();

        constructorBuilder
                .append(this.classFullName)
                .append("=function(args){")

                .append("var __args = [];")
                .append("if(args && arguments.length == 1){")
                .append("    if(args instanceof Array){")
                .append("      if(arguments.length == 1 && arguments[0] instanceof Array) {")
                .append("           __args = args.length == 0 ? arguments : [args];")
                .append("       }else{")
                .append("           __args = args.length == 0 ? arguments : args;")
                .append("       }")
                .append("    }else{")
                .append("        __args = [args];")
                .append("    }")
                .append("}else{")
                .append("    __args = arguments;")
                .append("}")

                .append(fieldsBuilder.toString())
                .append("if(this['constructor_'+__args.length] !== undefined){")
                .append("this['constructor_'+__args.length].apply(this, __args);")
                .append("}else{")
                .append("throw new Error('Spike: No matching constructor found ")
                .append(this.classFullName)
                .append(" with arguments count: '+__args.length);}};");

        constructorBuilder
                .append(this.classFullName)
                .append(".prototype.")
                .append(this.className)
                .append("=function(){")
                .append(fieldsBuilder.toString())
                .append("if(this['constructor_'+arguments.length] !== undefined){")
                .append("this['constructor_'+arguments.length].apply(this, arguments);")
                .append("}else{")
                .append("throw new Error('Spike: No matching constructor found ")
                .append(this.classFullName)
                .append(" with arguments count: '+arguments.length);}};");

        return constructorBuilder.toString();

    }

    private void createDefaultConstructor() {

        if (!this.hasDefaultConstructor()) {
            this.constructors.add(new SpikeClassConstructor(this, this.className + ":function(){}"));
        }

    }

    private void createWrapConstructor() {

        if (!this.hasWrapConstructor()) {
            //   this.constructors.add(new SpikeClassConstructor(this, this.className + ":function(obj){ for(var prop in obj){ if(this[prop] !== undefined){this[prop] = obj[prop]; } } }"));
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


        if (!this.isStatic()) {
            compiledBuilder.append(this.createConstructor());
        }

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

        this.compiled = compiledBuilder.toString();

        this.collectConstructorsExtendingDeclaration();
        this.createAssemblerDeclaration();

    }

    private void collectConstructorsExtendingDeclaration() {

        StringBuilder extendingBuilder = new StringBuilder();

        for (SpikeClassConstructor spikeClassConstructor : this.constructors) {

            if (!spikeClassConstructor.isDefaultConstructor) {

                extendingBuilder
                        .append("spike.core.Assembler.extend(")
                        .append(this.classFullName)
                        .append(".prototype,")
                        .append(this.classPackage.packageName)
                        .append(".")
                        .append(spikeClassConstructor.constructorArgumentsUniqueName)
                        .append(".prototype")
                        .append(");");

            }

        }

        this.extendsConstructorsDeclarations = extendingBuilder.toString();

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
                    .append("function(){ return {" + this.compiled + "}}")
                    .append(");");

        } else {

            declaration
                    .append("defineNamespace('")
                    .append(this.classFullName)
                    .append("',")
                    .append("function(){")
                    .append(this.compiled)
                    .append("});");
        }

        SpikeFile.TOTAL_NAMESPACES++;
        this.compiled = declaration.toString();

    }

    private void createClassFunctions() {

        String superClassName = (this.extendsName != null ? this.extendsFullName : this.classFullName);

        this.functions.add(new SpikeClassFunction(this, "getSuper:function(){ return '"+superClassName+"'; };"));
        this.functions.add(new SpikeClassFunction(this, "getClass:function(){ return '"+this.classFullName+"'; };"));
        this.fields.add(new SpikeClassField(this, "isClass: true,"));

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
