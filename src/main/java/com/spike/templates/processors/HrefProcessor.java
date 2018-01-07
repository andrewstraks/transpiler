package com.spike.templates.processors;

import com.spike.templates.U;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class HrefProcessor implements Processor {

    static private int hrefId = 0;

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        if(element.id().isEmpty()){
            hrefId++;
            element.attr("id", "spike-href-"+hrefId);
            element.attr("href", element.attr("spike-href"));
            element.removeAttr("spike-href");
        }else{
            throw new Exception("Spike Compiler: Spike href binding not allowed on elements with id attribute");
        }


    }

}
