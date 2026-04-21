import Link from 'next/link'
export const Footer = async ({ title }: { title: string }) => {
    return (
        <div>
            <h3>{title}</h3>
            <div className='box'>
                我是面板内容
            </div>
        </div>
    )
}
