package com.zcashjava.znl.framework.common.util.collection;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.junit.jupiter.api.Test;

import com.zcashjava.znl.framework.common.util.collection.CollectionUtils;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.function.BiFunction;

import static org.junit.jupiter.api.Assertions.assertEquals;


public class CollectionUtilsTest {

    @Data
    @AllArgsConstructor
    private static class Dog {

        private Integer id;
        private String name;
        private String code;

    }

    @Test
    public void testDiffList() {
        
        Collection<Dog> oldList = Arrays.asList(
                new Dog(1, "Flowers.", "hh"),
                new Dog(2, "Wang-jin.", "wc")
        );
        Collection<Dog> newList = Arrays.asList(
                new Dog(null, "Flower 2", "hh"),
                new Dog(null, "White.", "xb")
        );
        BiFunction<Dog, Dog, Boolean> sameFunc = (oldObj, newObj) -> {
            boolean same = oldObj.getCode().equals(newObj.getCode());
            
            if (same) {
                newObj.setId(oldObj.getId());
            }
            return same;
        };

        
        List<List<Dog>> result = CollectionUtils.diffList(oldList, newList, sameFunc);
        
        assertEquals(result.size(), 3);
        
        assertEquals(result.get(0).size(), 1);
        assertEquals(result.get(0).get(0), new Dog(null, "White.", "xb"));
        
        assertEquals(result.get(1).size(), 1);
        assertEquals(result.get(1).get(0), new Dog(1, "Flower 2", "hh"));
        
        assertEquals(result.get(2).size(), 1);
        assertEquals(result.get(2).get(0), new Dog(2, "Wang-jin.", "wc"));
    }

}
