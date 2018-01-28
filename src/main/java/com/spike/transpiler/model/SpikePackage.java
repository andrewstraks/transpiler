package com.spike.transpiler.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

public class SpikePackage {

    public SpikeFile spikeFile;

    public String packageName = null;
    public List<SpikeClass> classes = new ArrayList<>();
    public List<SpikeEnum> enums = new ArrayList<>();

    public String body = null;
    public String compiled = null;

    public SpikePackage(SpikeFile spikeFile, String body) {
        this.spikeFile = spikeFile;
        this.body = body.trim();
        this.collectClassNodes();
    }

    public void compile() {

        StringBuilder compiledBuilder = new StringBuilder();
        for (SpikeClass spikeClass : this.classes) {
            spikeClass.compile();
            compiledBuilder.append(spikeClass.compiled);
        }

        for (SpikeEnum spikeEnum : this.enums) {
            spikeEnum.compile();
            compiledBuilder.append(spikeEnum.compiled);

        }

        this.compiled = compiledBuilder.toString();

        this.compilePrivateUsages();
        this.compilePackageImports();

    }

    private void collectClassNodes() {

        List<String> imports = new ArrayList<>();
        boolean nodeCollecting = false;
        StringBuilder nodeBody = null;
        String[] lines = this.body.split("\n");
        for (int i = 0, l = lines.length; i < l; i++) {

            String line = lines[i].trim();
            int keywordIndexEnd = line.indexOf(" ");

            if (keywordIndexEnd > 4) {

                String keyword = line.substring(0, line.indexOf(" "));

                switch (keyword) {
                    case "package":
                        this.packageName = line.replace("package", "").replace(";", "").trim();
                        break;
                    case "import":
                        imports.add(line);
                        break;
                    case "private":
                    case "static":
                    case "class":
                    case "enum":

                        if (nodeCollecting) {
                            nodeCollecting = false;

                            String nodeBodyStr = nodeBody.toString();

                            if (nodeBodyStr.replace("private", "").replace("static", "").trim().startsWith("class")) {
                                this.classes.add(new SpikeClass(this, nodeBody.toString(), imports));
                            } else {
                                this.enums.add(new SpikeEnum(this, nodeBody.toString(), imports));
                            }

                            nodeBody = null;
                        }

                        nodeCollecting = true;
                        nodeBody = new StringBuilder();
                        break;
                }

            }

            if (i == l - 1) {
                nodeBody.append(line).append("\n");
                nodeCollecting = false;
                this.classes.add(new SpikeClass(this, nodeBody.toString(), imports));
                nodeBody = null;
            }

            if (nodeCollecting) {
                nodeBody.append(line).append("\n");
            }

        }

    }

    private void compilePrivateUsages() {

        for (SpikeClass spikeClass : this.classes) {

            if (spikeClass.isPrivate()) {
                this.replacePrivateUsage(spikeClass.privateClassName, spikeClass.className);
            }

        }

        for (SpikeEnum spikeEnum : this.enums) {

            if (spikeEnum.isPrivate()) {
                this.replacePrivateUsage(spikeEnum.privateClassName, spikeEnum.enumName);
            }

        }

    }

    private void replacePrivateUsage(String privateClassName, String className) {
        this.compiled = this.compiled.replaceAll("\\b" + Pattern.quote(className) + "\\b", this.packageName + "." + privateClassName);
    }

    private void compilePackageImports() {

        HashMap<String, String> imports = this.classes.get(0).imports;

        for (Map.Entry<String, String> importEntry : imports.entrySet()) {

            String importName = importEntry.getKey();
            String importFrom = importEntry.getValue();

            this.compiled = this.compiled.replaceAll("\\b" + Pattern.quote(importFrom) + "\\b", importName);
            this.compiled = this.compiled.replaceAll("\\b" + Pattern.quote(importName) + "\\b", importFrom);

            String importFromPackage = importFrom.substring(0, importFrom.lastIndexOf("."));
            this.compiled = this.compiled.replaceAll("\\b" + Pattern.quote(importFromPackage+"."+importFromPackage) + "\\b", importFrom);

        }

    }

    @Override
    public String toString() {
        return "SpikePackage{" +
                "packageName='" + packageName + '\'' +
                ", classes=" + classes +
                ", compiled='" + compiled + '\'' +
                '}';
    }


}
