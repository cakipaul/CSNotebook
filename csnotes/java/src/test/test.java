package test;

import java.util.ArrayList;

public class test {
    public static void main(final String[] args) {
        System.out.println(max(borderOrNot(new int[] { 1, 2, 3, 4, 5, 6, 7 })));
        // for()
    }

    public static Integer max(int[] array) {
        if (array.length < 1)
            return null;
        Integer max = (Integer) array[0];
        for (int i = 0; i < array.length; i++) {
            if (array[i] > max)
                max = (Integer) array[i];
        }
        return max;
    }

    public static int[] borderOrNot(int[] insideAndOutside) {
        if (insideAndOutside.length == 1) {
            return new int[] { insideAndOutside[0], 0 };
        } else if (insideAndOutside.length == 2) {
            return new int[] { insideAndOutside[1], insideAndOutside[0] };
        } else if (insideAndOutside.length == 3) {
            return new int[] { insideAndOutside[0] + insideAndOutside[2], insideAndOutside[1] };
        } else {
            int[] insideVilleges = new int[insideAndOutside.length - 1];
            for (int i = 0; i < insideVilleges.length; i++) {
                insideVilleges[i] = insideAndOutside[i];
            }
            return borderOrNot(
                    new int[] { borderOrNot(insideVilleges)[1] + insideAndOutside[insideAndOutside.length - 1],
                            borderOrNot(insideVilleges)[0] });
        }
        // return null;
    }
}