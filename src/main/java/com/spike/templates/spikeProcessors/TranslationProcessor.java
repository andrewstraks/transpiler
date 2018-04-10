package com.spike.templates.spikeProcessors;

import com.spike.templates.compilers.CommonCompiler;
import com.spike.templates.processors.SpikeProcessor;
import org.jsoup.nodes.Element;

/**
 * Created by Dawid on 2017-09-06.
 */
public class TranslationProcessor extends SpikeProcessor {

    @Override
    public void process(Element element, String spikeAttribute) throws Exception {

        if (element.tagName().equals("spike")) {
            throw new Exception("Spike Compiler: 'translation or placeholder' are not allowed on @spike tags");
        }

        String translation = element.attr(spikeAttribute);
        String params = element.attr(CommonCompiler.PARAMS);


            if (params.length() == 0) {
                translation = CommonCompiler.BRACKET_LEFT+CommonCompiler.MESSAGES_CLASS+"('" + translation + "')"+CommonCompiler.BRACKET_RIGHT;
            } else {
                translation = CommonCompiler.BRACKET_LEFT+CommonCompiler.MESSAGES_CLASS+"('" + translation + "'," + "[" + params + "])"+CommonCompiler.BRACKET_RIGHT;
            }


        element.removeAttr(spikeAttribute);
        element.removeAttr(CommonCompiler.PARAMS);
        element.html(translation);

    }

}
