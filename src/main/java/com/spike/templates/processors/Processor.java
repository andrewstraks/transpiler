package com.spike.templates.processors;

import com.spike.templates.U;
import org.jsoup.nodes.Element;

import java.util.HashMap;

/**
 * Created by Dawid on 2017-09-06.
 */
public abstract class Processor {

    public static int replacementsCount = 0;
    public static HashMap<String, String> replacementsSnippets = new HashMap<>();

    public void replaceWith(Element element, String snippet) {

        Element replacement = this.createReplacement(snippet);
        element.replaceWith(replacement);

    }


    public void addReplacementId(Element elementTo, Element elementFrom){
        elementTo.attr("replacement-id", elementTo.attr("replacement-id")+","+elementFrom.attr("replacement-id"));
    }

    public void addType(Element elementTo, Element elementFrom){
        elementTo.attr("type", elementTo.attr("type")+","+elementFrom.attr("type"));
    }

    public void insertBefore(Element element, String snippet) {
        this.insertBefore(element, snippet, false);
    }

    public void insertBefore(Element element, String snippet, Boolean force) {

        Element prefixElement = this.createReplacement(snippet);

        if(force){
            element.before(prefixElement);
        } else if (element.previousElementSibling() != null && element.previousElementSibling().tagName().equals("spike-replacement")) {
            this.addReplacementId(element.previousElementSibling(), prefixElement);
            this.addType(element.previousElementSibling(), prefixElement);
           // element.previousElementSibling().before(prefixElement);
        } else {
            element.before(prefixElement);
        }

    }

    public void insertAfter(Element element, String snippet) {
        this.insertAfter(element, snippet, false);
    }

    public void insertAfter(Element element, String snippet, Boolean force) {

        Element suffixElement = this.createReplacement(snippet);

        if(force){
            element.after(suffixElement);
        }else if (element.nextElementSibling() != null && element.nextElementSibling().tagName().equals("spike-replacement")) {
            this.addReplacementId(element.nextElementSibling(), suffixElement);
            this.addType(element.nextElementSibling(), suffixElement);
           // element.nextElementSibling().after(suffixElement);
        } else {
            element.after(suffixElement);
        }

    }

    public void prepend(Element element, String snippet) {

        Element suffixElement = this.createReplacement(snippet);
        element.prependChild(suffixElement);

    }

    public void append(Element element, String snippet) {

        Element suffixElement = this.createReplacement(snippet);
        element.appendChild(suffixElement);

    }

    private Element createReplacement(String snippet) {

        Processor.replacementsCount++;
        Processor.replacementsSnippets.put(Processor.replacementsCount + "", U.js(snippet));

        Element fakeElement = new Element("spike-replacement");
        fakeElement.attr("replacement-id", Processor.replacementsCount + "");
        fakeElement.attr("type", this.getClass().getSimpleName());

        return fakeElement;
    }


}
