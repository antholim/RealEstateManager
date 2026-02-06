public class Main {
    static int balance = 100;

    public static void main(String[] args) throws InterruptedException {

        Thread t1 = new Thread(() -> {
            balance = balance - 10;
        });

        Thread t2 = new Thread(() -> {
            balance = balance - 10;
        });

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println("Final balance: " + balance);
    }
}
