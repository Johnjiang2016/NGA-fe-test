export default function Loading({ text = "loading..." }: { text?: string }) {
    return <div className="flex-1 text-center p-8">{text}</div>
}