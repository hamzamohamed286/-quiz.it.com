<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz App UI</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
        }

        body {
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        /* Mobile App Container */
        .app-container {
            width: 100%;
            max-width: 400px;
            height: 850px;
            max-height: 100vh;
            background: linear-gradient(180deg, #38127d 0%, #7633f9 100%);
            position: relative;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            border-radius: 30px;
        }

        /* View Toggling */
        .view { display: none; height: 100%; width: 100%; flex-direction: column; }
        .view.active { display: flex; }

        /* --- SCREEN 1: QUIZ VIEW --- */
        .quiz-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 30px 20px 20px;
            color: white;
        }
        
        .back-btn, .timer {
            background: rgba(255, 255, 255, 0.15);
            padding: 8px 15px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 600;
        }
        .back-btn { padding: 10px 14px; }
        
        .progress-container {
            padding: 0 20px;
            margin-bottom: 20px;
        }
        .progress-bar {
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            position: relative;
        }
        .progress-fill {
            position: absolute;
            top: 0; left: 0;
            height: 100%; width: 20%;
            background: #4ade80;
            border-radius: 10px;
        }

        .question-card {
            background: white;
            margin: 0 20px;
            border-radius: 20px;
            padding: 25px 20px;
            flex-grow: 1;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            z-index: 10;
        }

        .category {
            color: #a0a0a0;
            font-size: 14px;
            margin-bottom: 10px;
            font-weight: 500;
        }

        .question {
            font-size: 20px;
            font-weight: 700;
            color: #333;
            margin-bottom: 25px;
            line-height: 1.4;
        }

        .option {
            border: 2px solid #f0f0f0;
            border-radius: 15px;
            padding: 15px 20px;
            margin-bottom: 12px;
            font-weight: 600;
            color: #444;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
        }

        .option.wrong {
            background: #ffe6e6;
            border-color: #ffcccc;
            color: #d32f2f;
        }
        
        .option.correct {
            background: #e6f9ec;
            border-color: #ccebda;
            color: #2e7d32;
        }

        .icon-circle {
            width: 24px; height: 24px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 12px;
        }
        .wrong .icon-circle { background: #f44336; }
        .correct .icon-circle { background: #4caf50; }

        .next-btn-container {
            padding: 20px;
            text-align: center;
        }

        .next-btn {
            background: #86efac;
            color: white;
            border: none;
            width: 100%;
            padding: 18px;
            border-radius: 15px;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 5px 15px rgba(134, 239, 172, 0.4);
        }

        /* --- SCREEN 2: SUMMARY VIEW --- */
        #summary-view {
            background: #f8f9fa;
        }

        .summary-header-bg {
            background: linear-gradient(180deg, #38127d 0%, #6225e6 100%);
            padding: 30px 20px 80px;
            border-bottom-left-radius: 40px;
            border-bottom-right-radius: 40px;
            text-align: center;
            position: relative;
        }

        .summary-header-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: white;
            margin-bottom: 20px;
        }

        .summary-card {
            background: white;
            border-radius: 20px;
            margin: -60px 20px 20px;
            padding: 30px 20px 20px;
            text-align: center;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
            position: relative;
        }

        .trophy-icon {
            font-size: 60px;
            margin-top: -60px;
            margin-bottom: 10px;
        }

        .summary-card h2 { color: #333; margin-bottom: 5px; }
        .summary-card p { color: #888; font-size: 14px; margin-bottom: 20px; }
        .points { color: #4caf50; font-weight: 600; }

        .stats-row {
            display: flex;
            justify-content: space-between;
            border-top: 1px solid #eee;
            padding-top: 15px;
        }

        .stat-box { flex: 1; text-align: center; }
        .stat-box:not(:last-child) { border-right: 1px solid #eee; }
        .stat-box .num { font-size: 18px; font-weight: 700; color: #333; display: flex; align-items: center; justify-content: center; gap: 5px;}
        .stat-box .label { font-size: 12px; color: #aaa; margin-top: 5px; }

        .tabs {
            display: flex;
            justify-content: space-around;
            padding: 10px 20px;
            border-bottom: 1px solid #eee;
            background: transparent;
        }
        .tab {
            padding: 10px;
            font-weight: 600;
            color: #aaa;
            cursor: pointer;
        }
        .tab.active {
            color: #333;
            border-bottom: 3px solid #6225e6;
        }

        .leaderboard {
            padding: 10px 20px;
            overflow-y: auto;
            flex-grow: 1;
        }
        
        .list-header {
            display: flex;
            justify-content: space-between;
            color: #aaa;
            font-size: 12px;
            margin-bottom: 15px;
            padding: 0 10px;
        }

        .player-row {
            display: flex;
            align-items: center;
            background: white;
            padding: 10px 15px;
            border-radius: 15px;
            margin-bottom: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.02);
        }

        .rank { font-weight: 700; width: 30px; color: #555;}
        .avatar {
            width: 40px; height: 40px;
            border-radius: 10px;
            background: #ffd54f;
            display: flex; justify-content: center; align-items: center;
            font-size: 20px; margin-right: 15px;
        }
        .player-info { flex-grow: 1; }
        .player-name { font-weight: 600; color: #333; font-size: 14px;}
        .player-coins { font-size: 12px; color: #4caf50; font-weight: 600;}
        .score-pct { font-weight: 700; color: #333;}
    </style>
</head>
<body>

    <div class="app-container">
        
        <!-- ================= QUIZ VIEW ================= -->
        <div id="quiz-view" class="view active">
            <div class="quiz-header">
                <div class="back-btn"><i class="fas fa-arrow-left"></i></div>
                <div class="question-count">02 of 10</div>
                <div class="timer"><i class="far fa-clock"></i> 03:58</div>
            </div>

            <div class="progress-container">
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
            </div>

            <div class="question-card">
                <div class="category">General Knowledge</div>
                <h2 class="question">Who among the following doesn't have the record of playing the most World Cup?</h2>
                
                <div class="option wrong">
                    Antonio Carbajal
                    <div class="icon-circle"><i class="fas fa-times"></i></div>
                </div>
                
                <div class="option">
                    Lothar Matthaus
                </div>
                
                <div class="option correct">
                    Franz Beckenbauer
                    <div class="icon-circle"><i class="fas fa-check"></i></div>
                </div>
                
                <div class="option">
                    Rafael Marquez
                </div>
            </div>

            <div class="next-btn-container">
                <button class="next-btn" id="nextBtn">Next</button>
            </div>
        </div>


        <!-- ================= SUMMARY VIEW ================= -->
        <div id="summary-view" class="view">
            <div class="summary-header-bg">
                <div class="summary-header-top">
                    <div style="width: 24px;"></div> <!-- Spacer -->
                    <h3>Quiz Summery</h3>
                    <i class="fas fa-home" style="font-size: 20px;"></i>
                </div>
            </div>

            <div class="summary-card">
                <div class="trophy-icon">🏆</div>
                <h2>Congratulations !</h2>
                <p>You've scored <span class="points">+80 points</span></p>
                
                <div class="stats-row">
                    <div class="stat-box">
                        <div class="num"><i class="fas fa-question-circle" style="color:#7633f9; font-size:14px;"></i> 10</div>
                        <div class="label">Total Que</div>
                    </div>
                    <div class="stat-box">
                        <div class="num"><i class="fas fa-check-circle" style="color:#4caf50; font-size:14px;"></i> 08</div>
                        <div class="label">Correct</div>
                    </div>
                    <div class="stat-box">
                        <div class="num"><i class="fas fa-times-circle" style="color:#f44336; font-size:14px;"></i> 02</div>
                        <div class="label">Wrong</div>
                    </div>
                </div>
            </div>

            <div class="tabs">
                <div class="tab active">Standings</div>
                <div class="tab">Summery</div>
                <div class="tab">Play again</div>
            </div>

            <div class="leaderboard">
                <div class="list-header">
                    <span>Rank</span>
                    <span>10 Players</span>
                    <span>Correct(%)</span>
                </div>

                <!-- Player 1 -->
                <div class="player-row">
                    <div class="rank">1<sup>st</sup></div>
                    <div class="avatar" style="background: #e1bee7;">👩‍🦰</div>
                    <div class="player-info">
                        <div class="player-name">Emili Williamson</div>
                        <div class="player-coins">Won 🪙 50</div>
                    </div>
                    <div class="score-pct">80%</div>
                </div>

                <!-- Player 2 -->
                <div class="player-row">
                    <div class="rank">2<sup>nd</sup></div>
                    <div class="avatar" style="background: #ffe0b2;">👦</div>
                    <div class="player-info">
                        <div class="player-name">Kelin Harward</div>
                    </div>
                    <div class="score-pct">70%</div>
                </div>

                <!-- Player 3 -->
                <div class="player-row">
                    <div class="rank">3<sup>rd</sup></div>
                    <div class="avatar" style="background: #c8e6c9;">👴</div>
                    <div class="player-info">
                        <div class="player-name">James Haydon</div>
                    </div>
                    <div class="score-pct">70%</div>
                </div>

                <!-- Player 4 -->
                <div class="player-row">
                    <div class="rank">4<sup>th</sup></div>
                    <div class="avatar" style="background: #bbdefb;">👩</div>
                    <div class="player-info">
                        <div class="player-name">Jessica Taylor</div>
                    </div>
                    <div class="score-pct">60%</div>
                </div>
            </div>
        </div>

    </div>

    <script>
        // سكربت بسيط للانتقال بين الشاشتين عند الضغط على زر Next
        document.getElementById('nextBtn').addEventListener('click', function() {
            document.getElementById('quiz-view').classList.remove('active');
            document.getElementById('summary-view').classList.add('active');
        });
    </script>
</body>
</html>
