package com.spike.transpiler.model;

import java.util.ArrayList;
import java.util.List;

public class SpikeFile {

    public static int TOTAL_NAMESPACES = 0;
    public static int PRIVATE_COUNTER = 100;

    public SpikeFile(String body) {
        this.body = body;
        this.createPackages();
    }

    public List<SpikePackage> packages = new ArrayList<>();

    public String body;
    public String compiled;

    public void compile() {

        StringBuilder compiled = new StringBuilder();
        for(SpikePackage spikePackage : this.packages){
            spikePackage.compile();
            compiled.append(spikePackage.compiled);
        }

        this.compiled = compiled.toString();
        this.collectTotalNamespaces();
        this.collectExtends();
    }

    private void createPackages() {

        String[] packagesDeclarations = this.body.split("package");

        for (String packageBody : packagesDeclarations) {
            this.packages.add(new SpikePackage("package" + packageBody));
        }

    }

    private void collectTotalNamespaces() {
        this.compiled = "var __spike_tn = " + TOTAL_NAMESPACES + ";" + this.compiled;
    }

    private void collectExtends() {

        List<ExtendingModel> extendingModels = new ArrayList<>();

        for (SpikePackage spikePackage : this.packages) {

            for (SpikeClass spikeClass : spikePackage.classes) {
                extendingModels.add(new ExtendingModel(spikeClass.extendsFullName, spikeClass.classFullName));
            }

        }

        //Posortowac jakims cudem i potem skonkatenowac do compiled
        //this.compiled += "spike.core.Assembler.extend(" + extendsFrom + "," + className + ");";

    }

}
