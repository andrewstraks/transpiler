package com.spike.templates.processors;

import com.spike.templates.U;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.TextNode;

/**
 * Created by Dawid on 2017-09-06.
 */
public class LogProcessor implements Processor {

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        if (element.tagName().equals("spike")) {

            String jsScript = element.attr(spikeAttribute);
            jsScript = "spike.core.Log.log("+jsScript+");";

            element.replaceWith(new TextNode(U.js(jsScript), ""));

        } else {
            throw new Exception("Spike Compiler: 'js' statement allowed only on @spike and @script tags");
        }

    }

}
