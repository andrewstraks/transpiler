package com.spike.transpiler.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class SpikePackage {

    public String packageName;
    public List<SpikeClass> classes = new ArrayList<>();

    public String body;
    public String compiled;

    public SpikePackage(String body){
        this.body = body;
        this.collectClassNodes();
    }

    public void compile() {

    }


    private void collectClassNodes() {

        StringBuilder imports = new StringBuilder();
        boolean nodeCollecting = false;
        StringBuilder nodeBody = null;
        String[] lines = this.body.split("\n");
        for (int i = 0, l = lines.length; i < l; i++) {

            String line = lines[i].trim();
            int keywordIndexEnd = line.indexOf(" ");

            if (keywordIndexEnd > 4) {

                String keyword = line.substring(0, line.indexOf(" "));

                switch (keyword) {
                    case "import":
                        imports.add(this.collectImport(line));
                        break;
                    case "private":
                    case "static":
                    case "class":

                        if (nodeCollecting) {
                            nodeCollecting = false;
                            this.nodes.add(new JsNode(nodeBody.toString(), NestedLevel.CLASS, imports));
                            nodeBody = null;
                        }

                        nodeCollecting = true;
                        nodeBody = new StringBuilder();
                        break;
                }

            }

            if (i == l - 1) {
                nodeBody.append(lines[i] + "\n");
                nodeCollecting = false;
                this.nodes.add(new JsNode(nodeBody.toString(), NestedLevel.CLASS, imports));
                nodeBody = null;
            }

            if (nodeCollecting) {
                nodeBody.append(lines[i] + "\n");
            }

        }

    }


//
//    public void compilePackageImports(String packageName) {
//
//        HashMap<String, String> importsFromTo = new HashMap<>();
//
//
//        if(importsCache.get(packageName) != null) {
//            importsFromTo = importsCache.get(packageName);
//        }
//
//        for (JsNode importNode : this.imports) {
//
//            String importName = importNode.body.substring(0, importNode.body.indexOf("from"));
//            importName = importName.replace("import", "").trim();
//
//            String importFullPath = importNode.body.substring(importNode.body.indexOf("from"), importNode.body.length());
//            importFullPath = importFullPath.replace("from", "").replace(";", "").trim();
//
//            System.out.println("Replacing import " + importName + " - " + importFullPath);
//
//            importsFromTo.put(importName, importFullPath);
//
//            this.compiled = this.compiled.replaceAll("\\b" + Pattern.quote(importFullPath) + "\\b", importName);
//            this.compiled = this.compiled.replaceAll("\\b" + Pattern.quote(importName) + "\\b", importFullPath);
//
//
//        }
//
//
//        importsCache.put(packageName, importsFromTo);
//
//    }
}
