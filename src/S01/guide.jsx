import React from "react";
import "./guide.less"

class Guide extends React.Component {
    render() {
        return(
            <div className="s01">
                <div className="guide">
                    <h1> Hướng dẫn chơi </h1>

                    <span>
                        Nhà lập trình game 0404 vừa sáng tạo ra trò chơi cùng các biến số.
                        Hiện thì trên màn hình trò chơi là một bảng gồm các biến số với <strong>tổng giá trị trên một hàng và một cột cho trước</strong>.
                        Mỗi biến số có dạng một chữ cái latin tiếng anh, mỗi biến số sẽ dại diện cho một con số nào đó.
                        Nhiệm vụ của bạn là phải xác định giá trị các biến số để tổng giá trị các biến số thỏa mãn tổng cho trước. 
                    </span>

                    <span>
                        Bên cạnh bảng là các ô trống để điền các biến số.
                        Để điền giá trị ta nhấp chuột vào ô chứa biến số cần điền rồi gõ giá trị cần điền.
                        Biết rằng <strong>giá trị biến số là số tự nhiên trong khoảng từ 0 đến 9</strong> và bảng được cho luôn tồn tại kết quả.
                        <br/><strong> Khi ta thay đổi giá trị của một biến số, các ô trên bảng chứa biến số, tổng hàng và tổng cột sẽ được thay đổi theo.</strong>
                        <br/><strong> Để nhận biết các ô chứa một biến số nào đó trên bảng ta chỉ cần nhấp chuột vào ô điền giá trị biến số đó.</strong>
                    </span>
                </div>
            </div>
        );
    }
}

export default Guide;