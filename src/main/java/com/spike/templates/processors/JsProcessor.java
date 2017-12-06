package com.spike.templates.processors;

import com.spike.templates.U;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.TextNode;

/**
 * Created by Dawid on 2017-09-06.
 */
public class JsProcessor implements Processor {

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        if(element.tagName().equals("spike")){

            if(element.attr(spikeAttribute).equals("")){

                String jsScript = element.html();
                element.replaceWith(new TextNode(U.js(jsScript), ""));

            }else{
                element.replaceWith(new TextNode(U.js(element.attr(spikeAttribute)), ""));
            }

        }else{
            throw new Exception("Spike Compiler: 'js' statement allowed only on @spike tags");
        }

    }

}
