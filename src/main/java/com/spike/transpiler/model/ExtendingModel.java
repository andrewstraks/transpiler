package com.spike.transpiler.model;

import java.util.ArrayList;
import java.util.List;

public class ExtendingModel {

    public String extendsFrom;
    public String extendsTo;

    public ExtendingModel(String extendsFrom, String extendsTo) {
        this.extendsFrom = extendsFrom;
        this.extendsTo = extendsTo;
    }

    @Override
    public String toString() {
        return "ExtendingModel{" +
                "extendsFrom='" + extendsFrom + '\'' +
                ", extendsTo='" + extendsTo + '\'' +
                '}';
    }
}
