package com.spike.transpiler.dependencies;

import com.spike.transpiler.model.ExtendingModel;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


public class DependencyConstructor {

    public String compiled;

    public void generateDependencies(List<ExtendingModel> extendingModelList, HashMap<String, List<String>> extendsClassesMap) {

        final List<String> dependenciesList = new ArrayList<String>();
        Graph<String> graph = new Graph<String>(new NodeValueListener<String>() {
            public void evaluating(String nodeValue) {
                dependenciesList.add(nodeValue);
            }
        });

        for(ExtendingModel extendingModel : extendingModelList){

            if(extendingModel.extendsFrom == null){
                graph.addDependency("object", extendingModel.extendsTo);
            }else{
                graph.addDependency(extendingModel.extendsFrom, extendingModel.extendsTo);
            }


        }

        graph.generateDependencies();
        this.createDependencies(dependenciesList.subList(1, dependenciesList.size()), extendsClassesMap);

    }

    public void createDependencies(List<String> dependenciesList, HashMap<String, List<String>> extendsClassesMap){

        StringBuilder compiledBuilder = new StringBuilder();

        compiledBuilder.append("spike.core.Assembler.dependencies(function(){");
        for(String dependency : dependenciesList){

            if(extendsClassesMap.get(dependency) != null){

                for(String extendsClassFullName : extendsClassesMap.get(dependency)){

                    if(extendsClassFullName != null){
                        compiledBuilder
                                .append("spike.core.Assembler.extend(")
                                .append(extendsClassFullName)
                                .append(",")
                                .append(dependency)
                                .append(");");
                    }

                }

            }

        }

        compiledBuilder.append("});");

        this.compiled = compiledBuilder.toString();

    }

}
