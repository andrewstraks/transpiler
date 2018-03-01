package com.spike.templates.processors;

import com.spike.templates.TemplateCompiler;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class TranslationProcessor implements Processor {

    @Override
    public void process(Element element, String spikeAttribute) {

        String translation = element.attr(spikeAttribute);
        String params = element.attr(TemplateCompiler.PARAMS);


            if (params.length() == 0) {
                translation = TemplateCompiler.BRACKET_LEFT+TemplateCompiler.MESSAGES_CLASS+"('" + translation + "')"+TemplateCompiler.BRACKET_RIGHT;
            } else {
                translation = TemplateCompiler.BRACKET_LEFT+TemplateCompiler.MESSAGES_CLASS+"('" + translation + "'," + "[" + params + "])"+TemplateCompiler.BRACKET_RIGHT;
            }


        element.removeAttr(spikeAttribute);
        element.removeAttr(TemplateCompiler.PARAMS);
        element.html(translation);

    }

}
