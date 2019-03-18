import React from "react";
import "./guide.less"

class Guide extends React.Component {
    render() {
        return(
            <div className="s50">
                <div className="guide">
                    <h1> Hướng dẫn chơi </h1>

                    <span>
                    Cho một hình chữ nhật với một số ô chứa một con vật đáng yêu bên trong.
                    Nhiệm vụ của bạn là phải ráp các hình chữ L thật khớp vào các ô trên bảng, 
                    sao cho <strong>mỗi hình chứ L chứa chính xác một ô chứa con vật. </strong>
                    <strong>Ta có thể xoay, lật tùy ý các hình chữ L.</strong>
                    </span>
                    <br/>
                    <span>
                        Ở bên phải hình, ta có hai nút xoay và lật để dễ dàng định dạng trạng thái hình chữ L.
                        Sau khi chọn được trạng thái thích hợp, ta di chuột đến ô cần điền.
                        <strong> Các ô hợp lệ sẽ được tô màu xanh lá, các ô không hợp lệ sẽ được tô màu đỏ. </strong>
                        <strong> Nếu muốn bỏ một hình chữ L, chỉ cần bấm vào một ô bất kì của hình đó. </strong>
                        Để điền hình chữ L vào bảng ta nhấp chuột vào ô cần điền.
                    </span>
                    <br/>
                </div>
            </div>
        );
    }
}

export default Guide;