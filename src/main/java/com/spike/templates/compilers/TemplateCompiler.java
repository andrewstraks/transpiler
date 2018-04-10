package com.spike.templates.compilers;

import com.spike.templates.jsifiers.*;
import com.spike.templates.resulters.ReplacementResulter;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

/**
 * Created by Dawid on 2017-09-03.
 */
public class TemplateCompiler {

    static ReplacementResulter replacementJsifier = new ReplacementResulter();

    public Element compile(Element body) throws Exception {

        Elements replacementElements = body.getElementsByTag("spike-replacement");
        for(Element element : replacementElements){
            replacementJsifier.result(element, false);
        }

        this.processRemovableAttributes(body);

        return body;

    }

    /**
     * TODO
     */
    public void processRemovableAttributes(Element body) {
    }

    public String jsify(Element body, String templatePath) throws Exception {

        String output = body.html();

        output = new SpikeTagJsifier().jsify(output);
        output = new EscapeJsJsifier().jsify(output);
        output = new ConcatJsifier().jsify(output);
        output = new ReplaceEscapesJsifier().jsify(output);
        output = new ReplaceBracketsJsifier().jsify(output);
        output = new RepairLinesJsifier().jsify(output);
        output = new OptimizeJsJsifier().jsify(output);

        output = new TemplateFunctionJsifier().jsify(output, templatePath);

        return output;

    }
}
