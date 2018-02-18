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

        if (element.tagName().equals("spike")) {

            if (element.attr(spikeAttribute).equals("")) {

                String jsScript = element.html();
                element.replaceWith(new TextNode(U.js(jsScript), ""));

            } else {
                String jsScript = element.attr(spikeAttribute);

                if(!jsScript.endsWith(";")){
                    jsScript = jsScript+";";
                }

                element.replaceWith(new TextNode(U.js(jsScript), ""));
            }

        } else if (element.tagName().equals("script")) {

            if (element.attr(spikeAttribute).equals("")) {

                String jsScript = element.html();
                element.removeAttr(spikeAttribute);
                element.tagName("script");
                element.replaceWith(new TextNode(U.js(jsScript), ""));

            } else {
                throw new Exception("Spike Compiler: 'js' statement with attribute expression allowed only on @spike tags");
            }

        } else {
            throw new Exception("Spike Compiler: 'js' statement allowed only on @spike and @script tags");
        }

    }

}
