
/**
 * author:          𝖕𝖆𝖚𝖑
 * date:       ２０１９．１２．１７
 *  
 *             𝓱𝓪𝓹𝓹𝔂 𝓬𝓱𝓻𝓲𝓼𝓽𝓶𝓪𝓼!
 *
 */
import java.util.Random;

/**
 * TreeInfo
 */
interface TreeInfo {
    // height of the pic
    int p_height = 40;
    // width of the pic
    int p_width = 120;
    // snow proportion in pic
    int p_snow = 5;
    // thickness of the tree
    int t_thickness = 7;
    // height of the tree stem
    int t_height = 10;
    // height of the leaves
    int l_height = 20;
    // width of the leaves
    int l_width = 90;
    // layers of the leaves
    int l_layers = 4;
    // shape of the Crown
    int SPLOT = 4;
    int SPAN = 7;
    // CONSTANT
    char BACK_GROUND = ' ';
    char SNOW = '*';
    char TREE = '#';
    // message on the tree
    String t_message = "Merry·Christmas·Mama~";// "𝖕𝖆𝖚𝖑"
    // message on the background
    String b_message = "Merry Christmas! ——paul 2019";// "𝖕𝖆𝖚𝖑"
}

public class ChristmasTree implements TreeInfo {

    public static void main(String[] args) {
        char[][] pic = new char[p_height][p_width];
        char[] message = t_message.toCharArray();
        int index = 0;
        Random r = new Random();

        for (int h = 0; h < pic.length; h++) {
            for (int w = 0; w < pic[0].length; w++) {
                // add background
                pic[h][w] = BACK_GROUND;

                // add snow
                int num = r.nextInt(100);
                if (num <= p_snow)
                    pic[h][w] = SNOW;

                // draw tree stem
                if (h >= pic.length - t_height && w >= (pic[0].length - t_thickness) / 2
                        && w < (pic[0].length + t_thickness) / 2)
                    pic[h][w] = TREE;

                int layer_height = l_height / l_layers;
                // draw tree leaves
                for (int l = 0; l <= l_layers; l++) {
                    for (int l_h = 0; l_h <= layer_height; l_h++) {
                        for (int l_w = (pic[0].length - l * SPAN - l_h * SPLOT)
                                / 2; l_w <= (pic[0].length + l * SPAN + l_h * SPLOT) / 2; l_w++) {
                            int row = pic.length - t_height - l_height + l * layer_height + l_h;
                            pic[row][l_w] = TREE;
                        }
                    }
                }
            }
        }

        for (int h = 0; h < pic.length; h++) {
            for (int w = 0; w < pic[0].length; w++) {

                // use message replace tree
                if (pic[h][w] == TREE) {
                    pic[h][w] = message[index++];
                    if (index >= message.length)
                        index = 0;
                }

                // DRAW PIC
                System.out.print(pic[h][w]);
            }
            System.out.print("\n");
        }
        System.out.println("");
        for (int i = 0; i < pic[0].length / 2 - b_message.length() / 2; i++)
            System.out.print(" ");
        System.out.println(b_message);
        System.out.println("\n\n");
    }
}
