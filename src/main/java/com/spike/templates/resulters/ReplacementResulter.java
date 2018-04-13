package com.spike.templates.resulters;

import com.spike.templates.processors.Processor;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.TextNode;

/**
 * Created by ds931004 on 05.04.2018.
 */
public class ReplacementResulter extends Resulter {

    public void result(Element element, Boolean isWatcher) throws Exception {

        String[] ids = element.attr("replacement-id").split(",");
        String[] types = element.attr("type").split(",");

        StringBuilder nodeBody = new StringBuilder();
        for(int i = 0; i < ids.length; i++){

            String id = ids[i].trim();
            String type = types[i].trim();
            String snippet = Processor.replacementsSnippets.get(id);

//            System.out.println("id: "+id);
//            System.out.println("type: "+type);
//            System.out.println("snippet "+snippet);

            if(isWatcher && (type.equals("EventProcessor") || type.equals("BindProcessor"))){
                nodeBody.append("");
            }else{
                nodeBody.append(snippet);
            }

        }

        element.replaceWith(new TextNode(nodeBody.toString(),""));

    }

    @Override
    public void result(Element element) throws Exception {

    }
}
