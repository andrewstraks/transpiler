package com.spike.transpiler.dependencies;

import com.spike.transpiler.model.ExtendingModel;
import com.spike.transpiler.model.SpikeFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class DependencyConstructor {

    public String compiled;

    public void generateDependencies(List<ExtendingModel> extendingModelList, HashMap<String, List<String>> extendsClassesMap, SpikeFile spikeFile) {

        final List<String> dependenciesList = new ArrayList<String>();
        Graph<String> graph = new Graph<String>(new NodeValueListener<String>() {
            public void evaluating(String nodeValue) {
                dependenciesList.add(nodeValue);
            }
        });

        for (ExtendingModel extendingModel : extendingModelList) {

            if (extendingModel.extendsFrom == null) {
                graph.addDependency("object", extendingModel.extendsTo);
            } else {
                graph.addDependency(extendingModel.extendsFrom, extendingModel.extendsTo);
            }


        }

        graph.generateDependencies();
        this.createDependencies(dependenciesList.subList(1, dependenciesList.size()), extendsClassesMap, spikeFile);

    }

    public void createDependencies(List<String> dependenciesList, HashMap<String, List<String>> extendsClassesMap, SpikeFile spikeFile) {

        StringBuilder compiledBuilder = new StringBuilder();

        compiledBuilder.append("spike.core.Assembler.dependencies(function(){");
        for (String dependency : dependenciesList) {

            if (extendsClassesMap.get(dependency) != null) {

                for (String extendsClassFullName : extendsClassesMap.get(dependency)) {

                    if (extendsClassFullName != null) {
                        compiledBuilder
                                .append("spike.core.Assembler.extend(")
                                .append(extendsClassFullName)
                                .append(".prototype")
                                .append(",")
                                .append(dependency)
                                .append(".prototype")
                                .append(");");

                        if (spikeFile.constructorsMap.get(extendsClassFullName) != null) {

                            for (Map.Entry<Integer, String> extendsClassConstructor : spikeFile.constructorsMap.get(extendsClassFullName).entrySet()) {

                                if (extendsClassConstructor.getKey() > 0) {

                                    String constructorFullName = extendsClassConstructor.getValue();
                                    String constructorsArguments = constructorFullName.substring(constructorFullName.indexOf("_"), constructorFullName.length());
                                    int constructorArgsCount = constructorsArguments.split("_").length-1;

                                    System.out.println("constructorFullName : "+constructorFullName);
                                    System.out.println("constructorsArguments : "+constructorsArguments);
                                    System.out.println("constructorArgsCount : "+constructorArgsCount);
                                    boolean constructorExist = false;

                                    //check if constructor with this arguments lenght exists = if yes, reject (because shouldn't override
                                    if (spikeFile.constructorsMap.get(dependency) != null) {

                                        if (spikeFile.constructorsMap.get(dependency).get(constructorArgsCount) != null) {
                                            constructorExist = true;
                                        }

                                    }
                                    //if not exist, add it

                                    if (!constructorExist) {

                                        compiledBuilder
                                                .append(dependency)
                                                .append(constructorsArguments)
                                                .append("=")
                                                .append(constructorFullName)
                                                .append(";");


                                        if (spikeFile.constructorsMap.get(dependency) != null) {
                                            System.out.println("spikeFile.constructorsMap.get(dependency) : "+spikeFile.constructorsMap.get(dependency));
                                            spikeFile.constructorsMap.get(dependency).put(constructorArgsCount, dependency + constructorsArguments);
                                            System.out.println("spikeFile.constructorsMap.get(dependency)2 : "+spikeFile.constructorsMap.get(dependency));
                                        }

                                        //inny problem - konstruktory nie przechodzą ze spike do aplikacji - stąd nie mogą być dziedziczone

                                        // spike.core.GlobalElement_parentElement_model = spike.core.Element_parentElement_model;


                                    }

                                }
                            }

                        }

                    }

                }

            }

        }

        compiledBuilder.append("});");

        System.out.println("spikeFile.constructorsMap : "+spikeFile.constructorsMap);

        this.compiled = compiledBuilder.toString();

    }

}