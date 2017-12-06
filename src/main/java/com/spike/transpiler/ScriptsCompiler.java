package com.spike.transpiler;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Dawid on 2017-01-29.
 */
public class ScriptsCompiler {

    enum NestedLevel {

        ROOT,
        CLASS,
        FUNCTIONS

    }

    class JsNode {

        String name;
        String body;
        NestedLevel level;

        List<JsNode> nodes;

        public JsNode(String body, NestedLevel level) {

            this.level = level;
            this.body = body.trim();
            this.name = body.substring(0, body.indexOf(" "));

            if(level == NestedLevel.CLASS){
                this.isNotStatic = this.body.substring(0, 10).indexOf("static") ==-1;
            }

            this.createNodes();

        }

        boolean isNotStatic = true;

        public boolean isNotStatic(){
            return this.isNotStatic;
        }

        public void createNodes() {
            this.nodes = new ArrayList<>();

            switch (this.level) {
                case ROOT:
                    this.createClassNodes();
                    break;
                case CLASS:

                    if(this.isNotStatic()){
                        this.createFunctionNodes();
                    }

                    break;
            }


        }

        public void createFunctionNodes() {

            System.out.println("CLASS...");
            boolean nodeCollecting = false;
            StringBuilder nodeBody = null;
            String[] lines = this.body.split("\n");

            int bracketsLeft = 0;
            int bracketsRight = 0;
            boolean functionCollecting = false;

            boolean propCollecting = false;
            for (int i = 0, l = lines.length; i < l; i++) {

                if (i != l - 1 && i != 0) {

                    String line = lines[i];
                    System.out.println(line);

                    if (!nodeCollecting) {

                        if (line.indexOf(":") > -1 && line.endsWith(",")) {
                            this.nodes.add(new JsNode(line, NestedLevel.FUNCTIONS));
                        } else if (line.indexOf(":") > -1 && line.indexOf("function") > -1) {
                            nodeCollecting = true;
                            nodeBody = new StringBuilder();
                            functionCollecting = true;
                        } else if (line.indexOf(":") > -1) {
                            nodeCollecting = true;
                            nodeBody = new StringBuilder();
                            propCollecting = true;
                        }

                    }

                    if (nodeCollecting) {

                        if (functionCollecting) {

                            if (line.indexOf("{") > -1) {
                                bracketsLeft++;
                            }

                            if (line.indexOf("}") > -1) {
                                bracketsRight++;
                            }

                            if (bracketsLeft == bracketsRight) {
                                bracketsLeft = 0;
                                bracketsRight = 0;
                                functionCollecting = false;
                                nodeCollecting = false;
                                nodeBody.append(line + "\n");
                                this.nodes.add(new JsNode(nodeBody.toString(), NestedLevel.FUNCTIONS));
                            }

                        } else if (propCollecting) {

                            if(i < l-1){

                                if(lines[i+1].indexOf("function") > -1){
                                    propCollecting = false;
                                    nodeCollecting = false;
                                    nodeBody.append(line + "\n");
                                    this.nodes.add(new JsNode(nodeBody.toString(), NestedLevel.FUNCTIONS));
                                }

                                int spaces = line.length() - line.replaceAll(" ", "").length();
                                int beforeSpaces = lines[i-1].length() - lines[i-1].replaceAll(" ", "").length();

                                if(spaces < beforeSpaces && line.endsWith(",")){
                                    nodeCollecting = false;
                                    propCollecting = false;
                                    nodeBody.append(line + "\n");
                                    this.nodes.add(new JsNode(nodeBody.toString(), NestedLevel.FUNCTIONS));
                                }

                            }else{
                                nodeCollecting = false;
                                propCollecting = false;
                                nodeBody.append(line + "\n");
                                this.nodes.add(new JsNode(nodeBody.toString(), NestedLevel.FUNCTIONS));
                            }


                        }


                    }

                    if (nodeCollecting) {
                        nodeBody.append(line + "\n");
                    }


                }


            }


//            System.out.println(".. END CLASS");
//            System.out.println("CLASS NODES...");
//
//            for(JsNode node: this.nodes){
//                System.out.println(node);
//            }
//
//            System.out.println("...END CLASS NODES");

        }

        public void createClassNodes() {

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
                            this.nodes.add(new JsNode(line, NestedLevel.CLASS));
                            break;
                        case "import":
                            this.nodes.add(new JsNode(line, NestedLevel.CLASS));
                            break;
                        case "private":
                        case "static":
                        case "class":

                            if (nodeCollecting) {
                                nodeCollecting = false;
                                this.nodes.add(new JsNode(nodeBody.toString(), NestedLevel.CLASS));
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
                    this.nodes.add(new JsNode(nodeBody.toString(), NestedLevel.CLASS));
                    nodeBody = null;
                }

                if (nodeCollecting) {
                    nodeBody.append(lines[i] + "\n");
                }

            }

        }

        @Override
        public String toString() {
            return "JsNode{" +
                    "name='" + name + '\'' +
                    ", body='" + body + '\'' +
                    ", nodes=" + nodes +
                    '}';
        }
    }

    public String compileSyntax(String fileBody) throws Exception {
        fileBody = removeComments(fileBody);

        if (hasClass(fileBody)) {

            if (!hasPackage(fileBody)) {
                throw new Exception("Class file has to have package declaration");
            }

            JsNode rootNode = new JsNode(fileBody, NestedLevel.ROOT);

             //System.out.println(rootNode);

        }

        return null;

    }

    public String removeComments(String fileBody) {

        StringBuilder builder = new StringBuilder();
        String[] splitted = fileBody.split("\n");

        boolean multiComment = false;
        for (int i = 0, l = splitted.length; i < l; i++) {

            if (splitted[i].trim().indexOf("*/") > -1) {
                multiComment = false;
            } else if (splitted[i].trim().indexOf("/*") > -1) {
                multiComment = true;
            } else if (multiComment == false && !splitted[i].trim().startsWith("//")) {
                builder.append(splitted[i] + "\n");
            }

        }

        return builder.toString().trim();

    }

    public boolean hasClass(String fileBody) {
        return fileBody.indexOf("class ") > -1;
    }

    public boolean hasPackage(String fileBody) {
        return fileBody.startsWith("package");
    }

}
