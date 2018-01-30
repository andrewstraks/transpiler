package com.spike.templates.processors;

import com.spike.templates.U;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.TextNode;

/**
 * Created by Dawid on 2017-09-06.
 */
public class DefaultProcessor implements Processor {

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        String prefix = U.js("default :");

        if (element.tagName().equals("spike")) {

            element.before(prefix);
            element.removeAttr(spikeAttribute);

        } else {
            throw new Exception("Spike Compiler: 'default' statement allowed only on @spike tags");
        }

    }

}
