from app.models import db, Comment, environment, SCHEMA


def seed_comments():
    demo_comments = [
        Comment(
          user_id=2, photo_id=1, comment="Wow that landscape is amazing!"
        ),
        Comment(
          user_id=2, photo_id=2, comment="Wow that landscape is amazing!"
        ),
        Comment(
          user_id=2, photo_id=3, comment="Wow that landscape is amazing!"
        ),
        Comment(
          user_id=2, photo_id=4, comment="Wow that landscape is amazing!"
        ),
        Comment(
          user_id=2, photo_id=5, comment="Wow that landscape is amazing!"
        ),
        Comment(
          user_id=3, photo_id=6, comment="That's Amazing!! How did you even get that shot?"
        ),
        Comment(
          user_id=3, photo_id=7, comment="That's Amazing!! How did you even get that shot?"
        ),
        Comment(
          user_id=3, photo_id=8, comment="That's Amazing!! How did you even get that shot?"
        ),
        Comment(
          user_id=1, photo_id=9, comment="That's the cutest picture I have ever seen! Great Job!"
        ),
        Comment(
          user_id=1, photo_id=10, comment="That's the cutest picture I have ever seen! Great Job!"
        ),
        Comment(
          user_id=1, photo_id=11, comment="That's the cutest picture I have ever seen! Great Job!"
        ),
        Comment(
          user_id=2, photo_id=12, comment="Wow that landscape is amazing!"
        ),
        Comment(
          user_id=2, photo_id=13, comment="Wow that landscape is amazing!"
        ),
        Comment(
          user_id=2, photo_id=14, comment="Wow that landscape is amazing!"
        ),
        Comment(
          user_id=2, photo_id=15, comment="Wow that landscape is amazing!"
        ),
        Comment(
          user_id=2, photo_id=16, comment="Wow that landscape is amazing!"
        ),
        Comment(
          user_id=3, photo_id=17, comment="That's Amazing!! How did you even get that shot?"
        ),
        Comment(
          user_id=3, photo_id=18, comment="That's Amazing!! How did you even get that shot?"
        ),
        Comment(
          user_id=3, photo_id=19, comment="That's Amazing!! How did you even get that shot?"
        ),
        Comment(
          user_id=1, photo_id=20, comment="That's the cutest picture I have ever seen! Great Job!"
        ),
        Comment(
          user_id=1, photo_id=21, comment="That's the cutest picture I have ever seen! Great Job!"
        ),
        Comment(
          user_id=1, photo_id=22, comment="That's the cutest picture I have ever seen! Great Job!"
        ),
        Comment(
          user_id=1, photo_id=23, comment="That's the cutest picture I have ever seen! Great Job!"
        ),
        Comment(
          user_id=1, photo_id=24, comment="That's the cutest picture I have ever seen! Great Job!"
        ),
        Comment(
          user_id=1, photo_id=25, comment="That's the cutest picture I have ever seen! Great Job!"
        ),
        Comment(
          user_id=1, photo_id=26, comment="That's the cutest picture I have ever seen! Great Job!"
        ),
    ]

    for comment in demo_comments:
        db.session.add(comment)

    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
