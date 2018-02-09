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

    public List<String> getClassConstructorsList(String classFullName, SpikeFile spikeFile){

        if(spikeFile.constructorsMap.get(classFullName) != null) {
            return spikeFile.constructorsMap.get(classFullName);
        }

        return null;

    }

    public List<Integer> getClassConstructorsCountList(String classFullName, SpikeFile spikeFile){

        List<Integer> list = new ArrayList<>();

        if(spikeFile.constructorsMap.get(classFullName) != null){

            for (String classConstructor : spikeFile.constructorsMap.get(classFullName)) {

                if(!classConstructor.contains("_")){
                    list.add(0);
                }else{
                    int constructorArgsCount = Integer.valueOf(classConstructor.split("_")[1]);
                    list.add(constructorArgsCount);
                }

            }

        }

        return list;

    }

    public String addConstructorsOverwrite(List<String> dependenciesList, HashMap<String, List<String>> extendsClassesMap, SpikeFile spikeFile) {

        StringBuilder compiledBuilder = new StringBuilder();

        System.out.println("dependenciesList : " + dependenciesList);
        System.out.println("extendsClassesMap : " + extendsClassesMap);
        System.out.println("spikeFile.constructorsMap : " + spikeFile.constructorsMap);

        for (Map.Entry<String, List<String>> extendsClasses: extendsClassesMap.entrySet()) {

            String baseClassFullName = extendsClasses.getKey();
            List<String> extendsClassesList = extendsClasses.getValue();

            List<Integer> baseClassConstructorsArgsCountList = this.getClassConstructorsCountList(baseClassFullName, spikeFile);
            for(String extendsClassFullName : extendsClassesList){
                List<Integer> extendsClassConstructorsArgsCountList = this.getClassConstructorsCountList(extendsClassFullName, spikeFile);
                extendsClassConstructorsArgsCountList.removeAll(baseClassConstructorsArgsCountList);

                if(extendsClassConstructorsArgsCountList.size() > 0){

                    System.out.println("baseClassFullName: "+baseClassFullName);
                    System.out.println("extendsClassFullName: "+extendsClassFullName);
                    System.out.println("extendsClassConstructorsArgsCountList : "+extendsClassConstructorsArgsCountList);

                    for(Integer constructorArgumentsCount : extendsClassConstructorsArgsCountList){

                        spikeFile.constructorsMap.get(baseClassFullName).add(baseClassFullName+"_"+constructorArgumentsCount);

                        compiledBuilder
                                .append(baseClassFullName)
                                .append("_")
                                .append(constructorArgumentsCount)
                                .append("=")
                                .append(extendsClassFullName)
                                .append("_")
                                .append(constructorArgumentsCount)
                                .append(";");

                    }

                }

            }

            }

        return compiledBuilder.toString();

    }

    public String addConstructorsExtending(List<String> dependenciesList, HashMap<String, List<String>> extendsClassesMap, SpikeFile spikeFile) {

        StringBuilder compiledBuilder = new StringBuilder();

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

                            for (String constructorFullName : spikeFile.constructorsMap.get(extendsClassFullName)) {

                                if (constructorFullName.contains("_")) {

                                    int constructorArgsCount = Integer.valueOf(constructorFullName.split("_")[1]);

                                    if (spikeFile.constructorsMap.get(dependency) != null) {

                                        for (String constructorDependencyFullName : spikeFile.constructorsMap.get(dependency)) {

                                            if (constructorDependencyFullName.contains("_")) {

                                                int constructorDependencyArgsCount = Integer.valueOf(constructorDependencyFullName.split("_")[1]);

                                                if (constructorDependencyArgsCount == constructorArgsCount) {

//                                                    compiledBuilder
//                                                            .append(constructorDependencyFullName)
//                                                            .append("?null:")
//                                                            .append(constructorDependencyFullName)
//                                                            .append("=")
//                                                            .append(constructorFullName)
//                                                            .append(";");

                                                    compiledBuilder
                                                            .append("spike.core.Assembler.extend(")
                                                            .append(constructorFullName)
                                                            .append(".prototype")
                                                            .append(",")
                                                            .append(constructorDependencyFullName)
                                                            .append(".prototype")
                                                            .append(");");

                                                }

                                            }

                                        }
                                    }

                                }
                            }

                        }

                    }

                }

            }

        }

        return compiledBuilder.toString();

    }

    public void createDependencies(List<String> dependenciesList, HashMap<String, List<String>> extendsClassesMap, SpikeFile spikeFile) {

        StringBuilder compiledBuilder = new StringBuilder();
        compiledBuilder.append("spike.core.Assembler.dependencies(function(){");

        compiledBuilder.append(this.addConstructorsOverwrite(dependenciesList, extendsClassesMap, spikeFile));
        compiledBuilder.append(this.addConstructorsExtending(dependenciesList, extendsClassesMap, spikeFile));

        compiledBuilder.append("});");

        this.compiled = compiledBuilder.toString();

    }

}