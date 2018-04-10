package com.spike.templates.processors;

import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public abstract class TagProcessor  extends  Processor{

    public abstract void process(Element element) throws Exception;

}
