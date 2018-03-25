package com.spike.templates.processors;

import com.spike.templates.U;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class NameProcessor implements Processor {

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        if(!element.attr("name").isEmpty()){
            element.attr(U.s("name"), element.attr("name"));
        }

    }

}
