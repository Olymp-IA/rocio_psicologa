import { BouncingBalls } from "@/components/ui/bouncing-balls";

export default function DemoOne() {
    return (
        <div className="relative w-full h-screen bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
            <div className="absolute inset-0 z-0">
                <BouncingBalls />
            </div>
            <div className="relative z-10 flex items-center justify-center w-full h-full pointer-events-none">
                <h1 className="text-4xl font-bold text-white drop-shadow-lg">Interactive Bouncing Balls</h1>
            </div>
        </div>
    );
}
