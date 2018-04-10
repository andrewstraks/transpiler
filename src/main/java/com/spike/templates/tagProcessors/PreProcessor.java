package com.spike.templates.tagProcessors;

import com.spike.templates.U;
import com.spike.templates.processors.TagProcessor;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class PreProcessor extends TagProcessor {

    @Override
    public void process(Element element) throws Exception {

        //this.replaceWith(element, U.ss(element.html()));
    }

}
